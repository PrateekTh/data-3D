## World Happiness Report 2019
Download this dataset from [this](https://www.kaggle.com/datasets/unsdsn/world-happiness) post on Kaggle, or from [here](./datasets/Happiness_Index_2019.csv) in the repository.

While this dataset is relatively smaller in size, given the number of countries is the maximum number of datapoints, it works really well in displaying different aspects of 3Data, without overcomplicating things.

A few example plots include:
1. **Perception of Corruption, Happiness and GDP per Capita**

    Recommended preset:
    - **X (Red)**: GDP per Capita - Continuous
    - **Y (Green)**: Score - Continuous
    - **Z (Blue)**: Perception of Corruption - Continuous

    <img src="./images/A-01.png" width=700>
    

    A very obvious interpretation here is the increase in GDP/Capita resulting in an overall greater happiness, which is to some extent, to be expected. 

    A rather interesting observation can be made on the Perception of Corruption:

    <img src="./images/A-02.gif" width=700>

    The index for perception stays in a limited, low range till a certain threshold (which can be seen in both GDP & the Happiness Score), after which it increases drastically. 
    Social Awareness is a huge issue in today's information based era desipite the dominance of democracy (which in turn benefits from a greater awareness level of the populace), and this gives a solid starting point to draw its factors.

2. **Color**: Adding "Freedom to make life choices"

    <img src="./images/A-03.gif" width=700>

    The Freedom to make life choices, as can be seen, adds further to the above conjecture, with holding a much more obvious connection with corruption perception.

    While the trend with high GDP countries continues, even countries with low GDP per capita & score but a high amount of Freedom show solid perceptions of corruption.

3. **Color and Scale**: "Generosity"

    > In order to perform a deeper, more clear analysis of any field, two dimensions can be used to portray it.

    <img src="./images/A-04.png" width=700>


    In this example, we see spikes in the datasets, with the blue points showing high scores on the generosity index, with most countries lying in rather lower - middle hues. 

    A notable point is the cluster with lowest amounts of generosity, that can be seen in the aforementioned threshold, in the middle of the Y-axis (Happiness score). Countries, outside this range show higher generosity scores, irrespective of GDP & Scores.

## Student Performance Dataset (by Rabie El Kharoua, 2024)
Another dataset from Kaggle, with details & download links available [on this link](https://doi.org/10.34740/KAGGLE/DS/5195702) and [here](./datasets/Student_performance_data%20_.csv) in the repository. 

This interesting dataset contains data from roughly `2,392` high school students, with an diverse array of metrics and classifications, that involve demographics, study habits, parental involvement, extracurricular activities, and academic performance.

1. **Absences, StudyTime and Grades**

    Recommended Preset:
    - **X (Red)**: Study Time Weekly - Continuous
    - **Y (Green)**: Grades - Continuous
    - **Z (Blue)**: Absences - Continuos

    <img src="./images/B-01.png" width=700>

    This results in an interesting skewed plane of datapoints, which can be used to imply some direct observations,

    - The weekly study time of the students does affect their total grade, but has a really low slope in doing so. 
    - In contrast, the absences seem to heavily impact student's performance, with a slope close to 1.

2. **Adding Color:** 

    Yet again, adding color makes the graphs even more intriguing.
    - **Color: Parental Support**

        <img src="./images/B-03.png" width=600>

        It can be inferred directly from the graph that the involvements of parents in the students' education largely results in a push in their performance. 

        Even though the correlation is not as direct as attendance itself, it is certainly an interesting observation.

    - **Color: Tutoring**

        <img src="./images/B-04.png" width=600>

        Similar to Parental support, tutoring does seem to have a significant impact on students' performance in a certain absence range.

Perhaps a too simplistic, but still viable summary of this analysis can be a message to students, to not skip their classes, as it factually seems to be the single most prominent factor to their performance, with others being enhancements over it.

---


As it can be inferred, the above "recommended presets" are meant to serve only as starting points, in the process where a highly experimentation/observation based approach is encouraged.