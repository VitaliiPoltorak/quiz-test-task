export enum QuestionType {
  SingleSelect = "single-select",
  MultipleSelect = "multiple-select",
  Bubble = "bubble",
}

export enum ViewType {
  Row = "row",
  Column = "col",
}

export enum GenderType {
  Female = "Female",
  Male = "Male",
  Other = "Other",
}

export enum FontTypes {
  Albert = "albert",
  Nunito = "nunito",
}

export enum TopicType {
}

export interface QuestionBase {
  title: string;
  description?: string;
  type: QuestionType;
  showBackButton: boolean;
  viewType?: ViewType;
  font?: FontTypes;
}

export interface Option {
  id: any;
  label: string;
  localeCode?: string;
  dependencyValue?: string;
  dependencies?: string[];
  icon?: string;
}

export interface SingleSelectQuestion extends QuestionBase {
  type: QuestionType.SingleSelect;
  options: Option[];
}

export interface MultipleSelectQuestion extends QuestionBase {
  type: QuestionType.MultipleSelect;
  options: Option[];
  minOptions?: number;
}

export interface BubbleQuestion extends QuestionBase {
  type: QuestionType.Bubble;
  options: Option[];
  minOptions: number;
}

export type QuestionInterface = SingleSelectQuestion | MultipleSelectQuestion | BubbleQuestion;


export type IconTypes = keyof typeof GenderType | keyof typeof TopicType;
