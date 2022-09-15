import IUserWord from "../IUserWord";
interface IPageState {
  currentGroup: number | null;
  currentPage: number | null;
  markedWordsOnPage: IUserWord[] | [];
}
export default IPageState;
