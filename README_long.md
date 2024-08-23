# <span style = "font-weight: bold; font-family: Tahoma; color:#b98474"> Retrospective Devlog - Three-yo! </span>
 
 >*This section focuses on the code & development aspect of this project.*

Welcome to the retrospective devlog!
Here I will go through some major design choices, ideas, challenges  that I've faced while building 3Data, and the reasoning behind some of my implementations.

<img src="https://images.uncyc.org/commons/2/21/69.JPG" alt="chiyo-chan" width=400>

## A. Motivation and Vision
The backbone and source of thought for this project is data. Since 2023, the advancement of AI is being heralded as if a new age has begun, but I firmly believe that it is still an era of information, and will stay like that. While NLP advancements and LLMs are amazing developments in themselves, it is still far from true intelligence considering how data is at the heart of these technologies, vast amounts of it. 

While current trends make it a bit imperative that I try to use an LLM to augment users' *"understanding of data"* in a project like this, in my humble opinion that would just be trying to skim over the core work that I'd have to do in creating new solutions for users, and turn it into a black box. Critical Thinking & Problem Solving is fun, and since I sincerely want to improve it with time, and keep as much of it as I can open-source, I'd rather keep learning and keep building!

Thus, this project is a solution I devised to make data accessible for users to understand, in the current age where data just keeps growing in size and importance.  

While it is supposed to be a generalized solution to all types of datasets, a particular area of interest is augmenting visualisation of results from AI Models, from LLMs to ML models. 

*"Everyone asks what the AI can do for me, but no one asks what can I do for the AI".* 

Don't worry AI, I got you. 

<img src="https://images.uncyc.org/commons/2/21/69.JPG" alt="chiyo-chan" width=100>


## B. Planning and Problem Modelling

The basis of the project originates from trying to create an interface to view data that does not overwhelm a user, as well as provide a solid vantage point to observe and draw conclusions from their data.

Most WebGL oriented projects tend to hook up to a certain dataset and visualise it deeply, which isn't an easy task in itself, but the current scenario required me to build a basis to classify data into several types, based on the data itself, as well as how the users wish to view it.

> Thus, this project had me account for a lot of mindful programming, one aspect coming from the **generalized data** being fed to it.

Below is a rough flowchart/DFD of the project.

<img src="https://images.uncyc.org/commons/2/21/69.JPG" alt="flow-chart" width=400>

## C. User Interface and Themes

Visually, the current goal of the website is to be simple, easy to operate and look decently good. Since I do not plan to focus on fancy animations and visuals just yet, I went for a  simplistic brutalist design (which I really like), with boxes and high contrast borders, with everything being more functionally built than to serve as eye-candy.

Still, this isn't something that I will be able to hold off for long, since I definitely want it to look better, and will surely come up with a better layout of controls. It might be better to steer in the direction of an editor like approach, instead of a controller, similar to something like blender, but I'd like to take in a lot of user feedback before making such changes.

For accessibility, the website also contains the ability to switch between a Dark and Light theme, implemented using Tailwind.

## D. WebGL and the Viewport
My desire to get better at WebGL has to be one of the driving factors throughout this project. "3D graphics, on the web" is a phrase that has captivated ever since I've been into development, and being an aspiring game designer as well, it is something I would like to become even better at.

3Data is a peek into the power and utility of WebGL beyond entertainment & creative projects. The project makes a heavy use of it, through three.js as well as React Three Fiber, for processing, visualising and so on.

The main component involved here is the **Viewport**, which contains the base plot components, lights, helper graphics, etc... similar to any classic 3D scene.

The types of base plots components available include:
- **Plane Model**: Builds a Texture from the selected data, then used as the height map of a plane containing the amount of corresponding vertices.
- **Datapoints Model**: Builds properties on a per-datapoint basis according to the user's choices, and uses Instanced meshes to display them.

As of the current live version, the datapoints component has been functionally utilized.

## E. Processing Datasets

Figuring out how to process the data has been certainly one of the more crucial parts of this project, and an overview can be seen from the above diagram.

While trying to come up with solutions, I went ahead and conducted a lot of research and (even though scarce) competitor analysis. While there are amazing 2D visualisation tools (such as `D3.js` and `Power BI`), from which I did take a lot of learnings, I must point out a few really good 3D visualisation tools:
- [trame (ParaView)](https://kitware.github.io/trame/)
- [graphia](https://graphia.app/)

While both provide a ton of features, it can be observed with a bit of use that they do get overshadowed by **high complexity**. Understanding, using and having them in the arsenal is certainly powerful, but the steep learning curve and understanding required to build what needs to be built is often too high. Also, as I have experienced in building 3Data as well, greater generalization results in exponentially more processing, and cases to account for, which consequently takes a hit at the overall performance.

Naturally, I believe that there exists a sweet spot between a learning powerful tool like graphia and the simplicity a user may wish for when they first look at the interface.

### Implementation
Learning from several tools and studying more and more data analysis, I built the following architecture to process data for the datapoints model: 

1. Provide the user with **dimensions** and the choice of which field to add in which dimension, with none being an option, to facilitate 2D/linear plots, if required.

2. For the main axes, X Y Z, the user may choose the **data types** as well. Data types for now include continuous, categorical and index-based data. Each of this results in a different type of plot, and will also determine the corresponding helper graphics, such as the labelling method.

3. For remaining dimensions, the data types are either fixed or determined while processing.

4. The selected data is filtered out of the main dataset, and passed onto the `Viewport` and subsequently the selected model type, which passes it onto the `layouts.js` module, to get plottable data.

5. The layout computations take into account the user choices, data types and all the provided context to process each field as per the requirements. The processing involves one or more of several functions of varying complexity in the module, such as **normalising** a numerical field, **categorising** discrete data, **discretizing** continuous fields, **uniformizing** etc...

6. Finally, the recieved data is plotted using an `Instanced Mesh` and updating the instanced mesh matrices as per the recieved data.

While this process does work smoothly for now, especially for smaller datasets (upto `20k` datapoints), there's certainly a lot of work to be done, be it optimising or refactoring the methods themselves.

### Error Handling
As of now there are a only a few known problems that may show up:
- Large datasets may quite some time to process when a visualization is built.
- Incorrect datatypes entered by the user.
- Incorrect filetypes - `csv` is recommended, and the more will be added *asap*.

While the time and performance issues are still being resolved, a custom Alert class has been implemented to let users know of any incompatible choices. An example of such choices might be choosing a continuous data type for a name field.

## F. Performance
The performance is, much at par with what I'd want from the initial build, but not at all close to what it needs to be.

- WebGL, with instanced geometry can be used to render an upwards of `500k` or even `1M` meshes on the web, and currently, the project is at a mere `5` - `10` percent of it.

- While 3Data can still render these many datapoints, since it uses the same instanced geometry, the amount of time taken to process them in general calls for terrible UX, and I'd recommend to not use it just yet for it, as it is a goal to improve in this department as rapidly as it can be done.

- Browser imposed limitations on resource usage have a significant impact, which explains the absence of 3D tools from the web.

### WebGPU

A very definite solution to boost performance that I am personally interested in as well is WebGPU, which would allow the use of compute shaders. To understand the reasons, I will go over the <u>differences</u> between the CPU and GPU in layman terms: 

- The CPU contains a comparatively small number of very, very fast cores, which makes it suitable for a wide variety of tasks. This makes it ideal to be modelled and labelled as a general purpose "brain" of a computer.

- The GPU, on the other hand, is  a rather specialized device, which contains a large number of cores, that are not as (comparatively) fast. This makes it really efficient and the go-to solutions in the specialized situations where it can be used. 

While working with WebGL graphic/processing task involves making use of both the CPU and the GPU, and the difference arrises in how well, and to what extent either of them support the needs.

- **Graphics API**: 

    WebGL and its 3D API is based on OpenGL, one of the most prominent APIs for GPU programming since years. In contrast, WebGPU is based on Vulkan, much more recent and highly cross-platform API. Vulkan is largely seen as a successor to OpenGL, and is much more optimised for modern hardware.

- **Compute Shaders**: 
    
    WebGL contains full functionality to build interactive websites, and write custom shaders, but a major missing part in WebGL that WebGPU provides is compute shaders, that allow running general purpose code (not related to visuals/graphics) on the GPU. Given the parallel processing nature of the GPU, the use of compute shaders can provide a huge boost. ML & AI training algorithms make heavy use of the GPU for the same reason.
    - Since I do hold some experience in writing shaders due to experience in game development, keeping this in mind, all of the processing functions of have been built to contain GPU-friendly logic, with each "loop" being intentionally similar to an independent shader program.

- **Support and Usability**:
    
    While WebGL & WebGPU share a lot of concepts but WebGPU being comparatively lower level, is quite a bit more complex. It involves lot more memory management and steps compared to WebGL, which implicitly maintains a lot of things for the user unless modified, such as a global state, the canvas, internal samplers etc..

The simple conclusion here is that there is a direct advantage and clear reasons (and plans) to shift to WebGPU, but I'm just not there yet. I acknowlege there is a lot to learn, and eventually, I will get there (soon).


## G. There's still more?

Most of the essential parts that are on top priority have been discussed in the [main readme](), and hence this section is focused on some remaining things, that I am really excited to work on adding, whenever I can get around to it:

- **Geographical Models**: A very interesting and fun feature, viewing the earth and looking at data visualised on the globe/maps just never gets old. I would like to try to make this as fleshed out as possible.

- **Heirarchical Data Models**: Considering the nature of AI processed data from a variety of tasks (sentiment analysis, summarization, segmentation, etc..), heirarchy in data is a growing trend as well, and an interesting type to model a solution for.

- **WebGPU Migration**: While the core concepts of WebGL and WebGPU may be very much similar, as I have mentioned multiple times the benefits of WebGPU being personally irresistible.




This was a lot to go through, and I congratulate and thank anyone who went through all this passionate rambling. I really appreciate it!

<img src="https://images.uncyc.org/commons/2/21/69.JPG" alt="chiyo-chan" >