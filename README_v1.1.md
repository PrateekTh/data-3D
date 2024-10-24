# Update log V1.5

This version of 3Data is faster than ever, with several new features. Now your EDA is bound do be a lot more addictive - because it hasn't been easier and faster to dive deep into massive datasets on the fly.

First of all, I'm really thankful to all the people who visited and provided feedback.
<img src="https://c.tenor.com/1weNCYu3iQkAAAAC/tenor.gif" width=200>

## Changes: 

### Refactored layout computation - 
- Add workers for layout computation
- Added Multithreading for heavy tasks via workers, greatly increasing efficiency (in resource usage) and speed.

### Added additional size controls -
The density and amount of data can make a single size inconsistent.

### Added support for more file input types -
- Now accepts CSVs, Excels, JSONs

### Added Interaction with datapoints  -
- Clicking on a datapoint selects it
    - Helper pointer on currently selected point
    - Current datapoint properties
- Copy properties (JSON) on click
- Copy individual properties on click

### User Interface Updates
- Labelling of Axis based on Fields selected
- Additional size control - User can set a multiplier for point size, from [0.01, 10)
- Refined and Updated UI for better support on mobile devices


### Adding Camera Snapping controls

------------------------

Pushing to future updates:

- Refactoring to an editor like interface
- Custom Shaders & choice options for shaders