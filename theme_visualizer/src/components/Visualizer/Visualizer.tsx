import { useEffect, useState } from "react";
import "./Visualizer.css";
import Color from "../Color";
import SearchArea from "../SearchArea/SearchArea";
import { NavLink } from "react-router-dom";

function Visualizer() {
  const [file, setFile] = useState<string | undefined>(undefined);
  const [searchedColor, setSearchedColor] = useState<string | undefined>(
    undefined
  );
  const [extension, setExtension] = useState("");
  const [searchIsActive, setSearchIsActive] = useState(false);
  const [colors, setColors] = useState<Map<string, string>>(new Map());
  const colorRegEx = /#[a-fA-F0-9]{6}/g;

  useEffect(() => {
    const matches: string[] = file?.match(colorRegEx) || [];
    setColors(new Map(matches.map((match) => [match, match])));
  }, [file]);

  const changeActiveFile = async (files: FileList | null) => {
    if (!files) return;

    if (files.length === 0 && file !== undefined) {
      setFile(undefined);
    } else {
      await files[0].text().then((text) => setFile(text));
      setExtension(files[0].name.split(".").pop() || "");
    }
  };

  const searchColor = (searched: string) => {
    setSearchIsActive(true);
    setSearchedColor(searched);
  };
  const updateColors = (originalColor: string, newColor: string) => {
    setColors(new Map(colors.set(originalColor, newColor)));
  };
  const downloadFile = () => {
    const blob = new Blob([updateFile() || ""], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `yourTheme${extension !== "" ? `.${extension}` : ""}`;
    link.href = url;
    link.click();
  };

  const updateFile = () => {
    const oldFile = file || "";
    let newFile = "";

    for (let i = 0; i < oldFile.length - 7; i++) {
      const subsStr = oldFile.substring(i, i + 7);
      if (colorRegEx.test(subsStr)) {
        newFile += colors.get(subsStr);
        i += 6;
      } else {
        newFile += oldFile[i];
      }
    }

    newFile += oldFile.substring(oldFile.length - 7);

    return newFile;
  };
  return (
    <div className="App">
      {colors.size === 0 ? (
        <div className="greetingPrompt">
          <h1>Welcome to the Theme Visualizer.</h1>

          <div className="filePrompt">
            <label htmlFor="uploadFile">
              <h2>Choose a theme file to visualize.</h2>
            </label>
            <h2 className="break">or</h2>
            <NavLink to="/ThemeCreator">
              <h2>Create a New Theme</h2>
            </NavLink>
          </div>
        </div>
      ) : (
        <>
          <div className="buttons">
            <label className="filePrompt" htmlFor="uploadFile">
              Change File
            </label>
            <button onClick={() => downloadFile()}>Download File</button>
          </div>

          <div className="colors">
            {[...colors].map((color) => (
              <Color
                key={color[0]}
                original={color[0]}
                color={color[1]}
                update={(newColor) => updateColors(color[0], newColor)}
                search={() => searchColor(color[1])}
              />
            ))}
          </div>
        </>
      )}

      <SearchArea
        file={updateFile()}
        searchedColor={searchedColor || ""}
        active={searchIsActive}
        close={() => setSearchIsActive(false)}
      />

      <input
        id="uploadFile"
        type="file"
        name="uploadFile"
        onChange={(e) => changeActiveFile(e.target.files)}
        accept="text/plain"
      />
    </div>
  );
}

export default Visualizer;
