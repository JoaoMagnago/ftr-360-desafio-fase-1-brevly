export function ShortLinkForm() {
  return (
    <div className="flex flex-col p-8 gap-6 bg-gray-100 max-w-[380px] w-full rounded-lg">
      <h2 className="text-lg text-gray-600">Novo link</h2>

      <div className="flex flex-col gap-4">
        <span className="text-gray-500 text-xs uppercase">Link original</span>
        <input
          className="h-12 w-full px-4 py[0.9375rem] text-gray-600 placeholder:text-gray-400 text-md font-regular"
          placeholder="www.exemplo.com.br"
        />

        <span className="text-gray-500 text-xs uppercase">Link original</span>
        <input
          className="h-12 w-full px-4 py[0.9375rem] text-gray-600 placeholder:text-gray-400 text-md font-regular"
          placeholder="brev.ly"
        />
      </div>

      <button className="bg-blue-base text-white text-md">Salvar link</button>
    </div>
  );
}
