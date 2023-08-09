export default interface ColorProps {
  original: string;
  color: string;
  update: (newColor: string) => void;
  search: () => void;
}
