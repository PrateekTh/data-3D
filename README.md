# //. 3Data .//

Good 3D visualisation tools are hard to come by. Building one involves at least a baseline understanding of mathematics, statistics, data science, along with the necessary programming and development skills.

Thus, while there are a number of amazing 2D visualisation tools and libraries, 3D is definitely still a step behind, with most technologies akin to CAD like software, rather than a to the point data plotting service.

This project is an attempt to remedy this, and given the recent developments in WebGL and especially the introduction of WebGPU, I believe the web can finally be used to build robust and fast applications, that are both graphically beautiful as well as highly data intensive.

## Introduction
3Data (*Three Data*) is a robust web tool that aims to provide multidimensional visualisations of any user provided dataset on the web.

**Check out the live demo at [this link](#introduction).**


Main features include:
- Realtime rendering of more than `50k` datapoints (KPI to focus on as the project grows).
- `Five` available dimensions to plot data simultaneously.
- Different types of `plots` and functionalities.
- Being a fully client side application, `fast` and `highly secure`.


## Setup
In order to setup the project on your local machine, follow the following steps:
- Clone this repository
- Navigate to the directory with using Command Prompt or a code editor of your choice.
- Navigate to the `Context-theme` sub-folder.
- Run `npm install` to fetch the dependencies.
    - In case you do not have Node Package Manager installed, download it from [this link]().
- Run `npm run dev` to start the development server.

## Tutorial & Overview

### Datapoints 
Datapoints refers to the individual meshes placed in 3D space. The meshes involve spheres, for scatter plots, and cylinders for distributions. 
> *While the website does support custom models (and contains the necessary components to load them), I do not see a utility for it just yet.*

### Plot Types
Currently there are two types of supported plots:

- **Scatter Plot**
    
    Each entry in data serves as a separate sphere datapoint in space, with dimensions being linked to its position and properties.

- **Distribution Plot**

    A count based distribution plot, which displays the number of entries in a sub-range as the height of a datapoints. Each datapoint is cylindrical, and support upto two dimensions.

    - In case of a single dimensions, the graph can be seen as a discretized maxwell distribution plot, just based on the provided column.
    - For two dimensions, the same correlation follows, and plots a datapoint for each existing unique pair of the two dimensions.

### Dimensions

Dimensions in 3Data are mapped to columns in the selected dataset. A plot type allows for a certain number of dimensions, based on what the type is for.

Scatter Plots support five main dimensions to plot data:
```
- 3D Axes (Color coded to RGB)
    - X axis (Necessary)
    - Y axis
    - Z axis
- Datapoint Properties:
    - Color
    - Scale
```
Distribution Plots support two dimensions:
```
- X axis(Necessary)
- Z axis
```

### Data Types

Each Axial field needs to be assigned a data type, which will result in corresponding functions being applied to it.

- **Continuous Data**: Contains continuous mathematical values, which follow a certain order, such as a range of integers, floats, etc.. The **Scale** axis is continuous only.
- **Categorical Data**: Refers to discrete data, which does not contain any solid mathematical relation between the values. Can be a string.
- **Index**: For fields where an axis requires a single datapoint on it, in a continuous manner. An example can be the date. (more suitable for 2D plots)

The **Color** field automatically infers the datatype, between continuous and categorical data, and lerps the hue between two colors: Low for red, and Light Blue for High.

> An error alert is thrown to notify the user of any incompatible choices.

## Examples

- ### World Happiness Report 2019
    Download this dataset from [this](https://www.kaggle.com/datasets/unsdsn/world-happiness) post on Kaggle, or from [here] in the repository.
    
    While this dataset is relatively smaller in size, given the number of countries is the maximum number of datapoints, it works really well in displaying different aspects of 3Data, without overcomplicating things.

    A few example plots include:
    1. Perception of Corruption, Happiness and GDP per Capita

        Recommended preset:
        - X: GDP per Capita - Continuous
        - Y: Score - Continuous
        - Z: Perception of Corruption - Continuous

        
        A very obvious interpretation here is the increase in GDP/Capita resulting in an overall greater happiness, which is to some extent, to be expected. 

        A rather interesting observation can be made on the Perception of Corruption:

        The index for perception stays in a limited, low range till a certain threshold (which can be seen in both GDP & the Happiness Score), after which it increases drastically. Social Awareness is a huge issue in today's information based era desipite the dominance of democracy (which in turn benefits from a greater awareness level of the populace), and this gives a solid starting point to draw its factors.

    2. Color: Adding "Freedom to make life choices"
        
        The Freedom to make life choices, as can be seen, adds further to the above conjecture, with holding a much more obvious connection with corruption perception.

        While the trend with high GDP countries continues, even countries with low GDP per capita & score but a high amount of Freedom show solid perceptions of corruption.

    3. Color and Scale: "Generosity"

        In order to perform a deeper, more clear analysis of any field, two scales can be used to portray it.


        In this example, we see spikes in the datasets, with the blue points showing high scores on the generosity index, with most countries lying in rather lower - middle hues. 

        A notable point is the cluster with lowest amounts of generosity, that can be seen in the aforementioned threshold, in the middle of the Y-axis (Happiness score). Countries, outside this range show higher generosity scores, irrespective of GDP & Scores.

- ### Student Performance Dataset (by Rabie El Kharoua, 2024)
    Another dataset from Kaggle, with details & download links available [on this link](https://doi.org/10.34740/KAGGLE/DS/5195702) and [here]() in the repository. 

    This interesting dataset contains data from roughly `2,392` high school students, with an diverse array of metrics and classifications, that involve demographics, study habits, parental involvement, extracurricular activities, and academic performance.

    1. **Absences, StudyTime and Grades**

        Recommended Preset:
        - X: Study Time Weekly - Continuous
        - Y: Grades - Continuous
        - Z: Absences - Continuos

        This results in an interesting skewed plane of datapoints, which can be used to imply some direct observations -

    2. **Adding Color:** Yet again, adding color makes the graphs even more intriguing.
        - **Color: Parental Support**
    
            It can be inferred directly from the graph that the involvements of parents in the students' education largely results in a push in their performance. 

            Even though the correlation is not as direct as attendance itself, it is certainly an interesting observation.

        - **Color: Tutoring**

            Similar to Parental support, tutoring does seem to have a significant impact on students' performance in a certain absence range.

    Perhaps a too simplistic summary of this analysis can be a message to students, to not skip their classes, as it factually seems to be the single most prominent factor to their performance, with others being enhancements over it.

As it can be inferred, the above "recommended presets" are meant to serve only as starting points, in the process where a highly experimentation/observation based approach is encouraged.

## Tech Stack

- **Languages**
    - JavaScript 
    - HTML & [Tailwind CSS](https://tailwindcss.com/)

- **Frameworks & Libraries**
    - [`React`](https://react.dev/): Prominent front-end JS framework/library.
    - [`ThreeJS`](https://threejs.org/): Awesome cross-platform WebGL API/Library.
    - [`React Three Fiber`](https://r3f.docs.pmnd.rs/getting-started/introduction): Highly resourceful react renderer for three.js.
    - [`DanfoJS`](https://danfo.jsdata.org/): High-performance data manipulation API/library in JS (similar to pandas)

## What's Next?

It is obvious that the current state of the project, though very useful, is still far from complete. 

Given the generalized nature, there's an unending number of features that can be added, including several features that are a necessity to provide a great user experience.

Thus, focusing on the second half, before jumping to huge functional additions, the following tasks take precedence over others, and I will try to implement them in the near future:
- Labelling axes with respect to the data and current visualisation.
- Helper graphics, such as pointers to select and view individual datapoints.
- Lots of animations, and custom shader support for the viewport.

Another very important goal apart from improving User Experience is the integration of **WebGPU** and **compute shaders**, to improve the performance greatly.