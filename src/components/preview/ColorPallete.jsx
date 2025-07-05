function ColorPallete({
  formBgColor,
  formTextColor,
  setFormBgColor,
  setFormTextColor,
  presetBgColors,
  presetTextColors,
}) {
  return (
    <aside className="w-full md:w-70 p-6 shadow-md border-r border-gray-200 bg-white ">
      <h4 className="text-l font-bold text-black mb-1 uppercase mb-4">
        Color Customization
      </h4>
      <div className="mb-10">
        <h4 className="text-xs font-semibold text-gray-600 mb-3 uppercase">
          Form Background
        </h4>
        <div className="flex gap-2 flex-wrap mb-2">
          {presetBgColors.map((color) => (
            <button
              key={color}
              className={`w-6 h-6 rounded border-2 border-black`}
              style={{ backgroundColor: color }}
              onClick={() => setFormBgColor(color)}
            />
          ))}
          <input
            type="color"
            value={formBgColor}
            onChange={(e) => setFormBgColor(e.target.value)}
            className="w-8 h-6 border border-gray-300 rounded"
          />
        </div>
      </div>

      <div>
        <h4 className="text-xs font-semibold text-gray-600 mb-3 uppercase">
          Text Color
        </h4>
        <div className="flex gap-2 flex-wrap mb-2">
          {presetTextColors.map((color) => (
            <button
              key={color}
              className={`w-6 h-6 rounded-full border-2 border-black`}
              style={{ backgroundColor: color }}
              onClick={() => setFormTextColor(color)}
            />
          ))}
          <input
            type="color"
            value={formTextColor}
            onChange={(e) => setFormTextColor(e.target.value)}
            className="w-8 h-6 border border-gray-300 rounded"
          />
        </div>
      </div>
    </aside>
  );
}

export default ColorPallete;
