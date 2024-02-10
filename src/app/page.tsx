"use client";

import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { useState } from "react";
import { fabric } from "fabric";
import { ChangeEvent, useRef } from "react";

function page() {
  const { editor, onReady } = useFabricJSEditor();

  const resetText = () => {
    editor?.deleteSelected();
  };

  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const onAddText = () => {
    editor?.addText(text);
  };

  const handlePic = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const file = event.target.files[0];
    const url = URL.createObjectURL(file);

    fabric.Image.fromURL(url, (oImg: Klass | Object) => {
      oImg.scale(0.1).set("flipX", true);
      editor?.canvas.add(oImg);
    });
  };

  const handlesTextChange = (e) => {
    setText(e.target.value);
  };

  const generateImage = () => {
    const dataURL = editor?.canvas.toDataURL();
    const a = document.createElement("a");
    a.download = "image.png";
    a.href = dataURL;
    a.click();
  };

  return (
    <div className="h-screen w-full bg-neutral-950 text-black p-2">
      <div className="flex py-5 items-center justify-evenly ">
        <div className="flex gap-2 items-center">
          <button
            onClick={onAddText}
            className="py-2 px-6 bg-orange-600 text-white rounded-xl m-4 hover:scale-[1.02]"
          >
            Add Text
          </button>

          <input
            type="text"
            onChange={handlesTextChange}
            placeholder="Text"
            className="py-2 px-3 rounded-xl outline-none border-none hover:scale-[1.02]"
          />

          <button
            onClick={resetText}
            className="py-2 px-6 bg-slate-100 text-black rounded-xl hover:scale-[1.02]"
          >
            Delete
          </button>
        </div>

        <div className="flex gap-2 ">
          <button
            onClick={() => inputRef.current?.click()}
            className="py-2 px-6 bg-yellow-500 text-white rounded-xl m-4 hover:scale-[1.02]"
            children="Subir archivo"
          />

          <input
            type="file"
            onChange={handlePic}
            ref={inputRef}
            className="hidden"
          />

          <button
            onClick={generateImage}
            className="py-2 px-6 bg-indigo-500 text-white rounded-xl m-4 hover:scale-[1.02]"
            children="Generar archivo"
          />
        </div>
      </div>

      <div className="h-[70%]  mx-5">
        <FabricJSCanvas
          onReady={onReady}
          className="h-[100%] bg-yellow-300 rounded-lg "
        />
      </div>
    </div>
  );
}

export default page;
