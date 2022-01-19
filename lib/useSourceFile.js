import { useAppContext } from "../context/AppContext";

const useSourceFile = (source = null) => {
  const { sourceFile, setSourceFile } = useAppContext();
  setSourceFile(source);

  return sourceFile;
};

export default useSourceFile;
