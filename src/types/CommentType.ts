export interface CommentType {
  by: string;
  id: number;
  kids?: number[];
  parent: number;
  time: number;
  text: string;
  type: string;
  deleted?: true;
}
