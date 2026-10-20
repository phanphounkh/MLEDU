import curriculumData from "@/data/curriculum.json";
import videoMapData from "@/data/video-map.json";

export type Lesson = {
  id: string;
  number: string;
  title: string;
  duration: string;
  tags: string[];
};

export type Module = {
  id: string;
  number: number;
  title: string;
  description: string;
  level: string;
  lessons: Lesson[];
};

export type LessonVideo = {
  videoId: string;
  playlistIndex: number;
  title: string;
  match: "primary" | "related";
};

export const modules = curriculumData as Module[];
export const lessons = modules.flatMap((module) =>
  module.lessons.map((lesson) => ({ ...lesson, module }))
);
export const totalLessons = lessons.length;

export function getLesson(id: string) {
  return lessons.find((lesson) => lesson.id === id);
}

export function getLessonIndex(id: string) {
  return lessons.findIndex((lesson) => lesson.id === id);
}

export const playlistId = "PLfFghEzKVmjsNtIRwErklMAN8nJmebB0I";
export const videoMap = videoMapData as Record<string, LessonVideo>;

export function getLessonVideo(id: string) {
  return videoMap[id];
}

export function getYouTubeUrl(video: LessonVideo) {
  return `https://www.youtube.com/watch?v=${video.videoId}&list=${playlistId}&index=${video.playlistIndex}`;
}

export function tutorialFor(title: string, moduleTitle: string) {
  return `## What you'll learn

In this lesson, you'll build an intuitive understanding of **${title}** and connect it to the wider ${moduleTitle} workflow.

### Core idea

Machine learning works best when we translate a real-world question into clear inputs, an appropriate learning objective, and a measurable outcome. As you study ${title}, focus on three questions:

1. **What problem does it solve?** Identify the input, output, and assumptions.
2. **How does it learn?** Follow how data changes the model's internal parameters.
3. **How do we know it works?** Choose a metric that reflects the actual goal.

> **Learning tip:** Explain the concept in plain language before reaching for the formula. If you can teach it, you understand it.

### Practical workflow

- Define the problem and expected output.
- Inspect and prepare the data.
- Establish a simple baseline.
- Train, validate, and compare results.
- Document assumptions and failure cases.

### Knowledge check

What would happen if the data used in this lesson were noisy, imbalanced, or collected from a different population? Write down one risk and one way to test for it.`;
}

export function codeFor(title: string) {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
  return `# ${title}\n# A compact, reusable learning scaffold\n\nimport numpy as np\nimport pandas as pd\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.preprocessing import StandardScaler\n\n# 1. Load and inspect your data\ndata = pd.DataFrame({\n    "feature_1": [1.2, 2.4, 3.1, 4.8, 5.2],\n    "feature_2": [8, 6, 7, 3, 2],\n    "target": [0, 0, 1, 1, 1],\n})\nprint(data.head())\n\n# 2. Prepare a reproducible split\nX = data.drop(columns="target")\ny = data["target"]\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42\n)\n\n# 3. Scale numeric features\nscaler = StandardScaler()\nX_train_scaled = scaler.fit_transform(X_train)\nX_test_scaled = scaler.transform(X_test)\n\nprint("${slug} ready:", X_train_scaled.shape)\n`;
}
