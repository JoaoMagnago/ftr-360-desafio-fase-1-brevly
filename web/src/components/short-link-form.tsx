export function ShortLinkForm() {
  return (
    <div className="flex flex-col p-8 gap-6 bg-gray-100 max-w-[380px] w-full rounded-lg">
      <h2 className="text-xl/8 font-(weight:--font-bold) text-gray-600">
        Novo link
      </h2>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-xs/(--line-height-xs) text-gray-500 uppercase">
            Link original
          </span>
          <input
            className="h-12 w-full px-4 py[0.9375rem] text-md text-gray-600 border-[1px] border-gray-300 rounded-lg focus-visible:outline-none placeholder:text-gray-400"
            placeholder="www.exemplo.com.br"
            spellCheck={false}
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs/(--line-height-xs) text-gray-500 uppercase">
            Link encurtado
          </span>
          <div className="flex align-center h-12 w-full px-4 py[0.9375rem] text-md border-[1px] border-gray-300 rounded-lg">
            <span className="self-center h-fit text-gray-600">brev.ly/</span>
            <input
              className="w-full text-gray-600 focus-visible:outline-none"
              spellCheck={false}
            />
          </div>
        </div>
      </div>

      <button className="h-12 text-md text-white font-(weight:--font-semibold) cursor-pointer bg-blue-base rounded-lg hover:brightness-101 ease-in-out">
        Salvar link
      </button>
    </div>
  );
}
