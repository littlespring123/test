// 博客
// 下拉框选项
export interface ISelectOptions {
  text: string;
  value: string;
}

// 博客的提交表单
export interface blogFormType {
  title: string;
  content: string;
  tag: string[];
}

// 渲染的节点
export interface NodeType {
  name?: string;
  id?: number | string;
  level?: number;
  parent?: any;
  children?: [];
  rawName?: string;
  scrollTop?: number;
  isVisible?: boolean;
}

// 博客的标签
export interface IBlogTag {
  id: number;
  fatherid: number;
  content: string;
}

// 博客的每一项（后端返回的列表项）
export interface IBlogItem {
  content: string;
  count: number;
  id: number;
  lasttime: string;
  tag: IBlogTag[];
  title: string;
  uid: string;
}

// 转换为html的结构
export interface IHtmlContent {
  content: string;
  toc: ITitleArr[];
  maxTitle: number;
}

export interface ITitleArr {
  id: number;
  tag: number;
  text: string;
}
