export type RevealState = 'hidden' | 'initials' | 'full';

export interface Example {
  id: string;
  text: string;
  containsAnswer: boolean;
}

export interface Meaning {
  id: number;
  text: string;
  basicExamples: Example[];
  supplementaryExamples: Example[];
}

export interface AdditionalMaterial {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail: string;
}

export interface WordData {
  id: string;
  word: string;
  initials: string;
  meanings: Meaning[];
  additionalMaterials?: AdditionalMaterial[];
}

export interface WordState {
  revealState: RevealState;
  activeMeaningTab: number;
  displayedMeaningId: number | null;
  activeExampleId: string | null;
  visitedMeaningIds: Set<number>;
  visitedExampleIds: Set<string>;
  expandedSupplementaryMeaningIds: Set<number>;
  visitedAdditionalMaterialIds: Set<string>;
  activeAdditionalMaterialId: string | null;
}
