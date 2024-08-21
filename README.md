# 3Data

Good 3D visualisation tools are hard to come by. Building one involves at least a baseline understanding of mathematics, statistics, data science, along with the necessary programming and development skills.

Thus, while there are a number of amazing 2D visualisation tools and libraries, 3D is definitely still a step behind, with most technologies akin to CAD like software, rather than a to the point data plotting service.

This project is an attempt to remedy this, and given the recent developments in WebGL and especially the introduction of WebGPU, I believe the web can finally be used to build robust and fast applications, that are both graphically beautiful as well as highly data intensive.

## Introduction
3Data (*Three Data*) is a robust web tool that aims to provide a multidimensional visualisations of any user provided dataset on the web.

**Check out the live demo at [this link](https://www.google.com).**


Main features include:
- Realtime rendering of more than `50k` datapoints (KPI to focus on as the project grows).
- `Five` available dimensions to plot data simultaneously.
- Different types of plots and functionalities.
- Being a fully client side application, fast and highly secure.


## Setup
In order to setup the project on your local machine, follow the following steps:
- Clone this repository
- Navigate to the directory with using Command Prompt or a code editor of your choice.
- Navigate to the `Context-theme` sub-folder.
- Run `npm install` to fetch the dependencies.
    - In case you do not have Node Package Manager installed, download it from [this link]().
- Run `npm run dev` to start the development server.

## Brief Tutorial


### Datapoints 
Datapoints refers to the individual meshes placed in 3D space. The meshes involve spheres, for scatter plots, and cylinders for distributions. While the website does support custom models in their place, I do not see a utility for it just yet.

### Plot Types
Currently there are two types of supported plots:

- **Scatter Plot**
    
    Each entry in data serves as a separate sphere datapoint in space, with dimensions being linked to its position and properties.

- **Distribution Plot**

    A classic count based distribution plot, which displays the number of datapoints as their size. Each datapoint is cylindrical, and support upto two dimensions.

    - In case of a single dimensions, the graph can be seen as a discretized maxwell distribution plot.
    - For two dimensions, the same correlation follows, and plots a datapoint for each existing unique pair of the two dimensions.

### Dimensions

A plot type allows for a certain number of dimensions, based on the possibilities.

Scatter Plots support five main dimensions to plot data:
- 3D Axes
    - X axis
    - Y axis
    - Z axis
- Datapoint Properties:
    - Color
    - Scale

Distribution Plots support two dimensions:
- X axis
- Z axis

## Examples



## Tech Stack

- JavaScript, HTML, Tailwind CSS
- React, ThreeJS
- React Three Fiber, DanfoJS

## What's Next?

It is quite obvious that the current state of the project, though very useful, is still far from complete. 

Given the generalized nature, there's an unending number of features that can be added, and several features that are a necessity, to provide a great user experience.

Thust, focusing on the second half, before jumping to huge functional editions the following tasks take precedence over others, and I will try to implement them in the near future:
- Labelling axes with respect to the data and current visualisation.
- Helper graphics, such as pointers to select and view individual datapoints.
- Lots of animations, and custom shader support for the viewport.
