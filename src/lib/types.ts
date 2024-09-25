interface SelectedTopic {
    title: string;
    description: string;
  }
  
  interface DifficultyLevel {
    value: string;
    options: string[];
  }
  
  interface ReferencedVideo {
    value: string;
    options: string[];
  }
  
  interface Options {
    difficultyLevel: DifficultyLevel;
    duration: number;
    noOfChapters: number;
    referencedVideo: ReferencedVideo;
  }
  
  interface SelectedData {
    selectedCategory: string;
    selectedTopic: SelectedTopic;
    options: Options;
  }
  
  export interface StepProps {
    selectedData: SelectedData;
    setSelectedData: React.Dispatch<React.SetStateAction<SelectedData>>;
  }
  
  const propmt="Generate A Course Tutorial on Following Detail With field as Course Name, Description, Along with Chapter Name, about, Duration: Category: 'Programming', Topic: Python, Level:Basic, Duration: 1 hours, NoOf Chapters: 5 Iin JSON format"