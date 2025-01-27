function WebUrlNewList({ urlNewList }) {
  return (
    <div className="w-full h-[calc(100vh-200px)] overflow-y-auto">
      {urlNewList.map((url, index) => (
        <div
          className="w-full flex"
          key={index}
        >
          <a
            className="w-full max-w-[calc(100%-10px)] flex-grow overflow-hidden text-ellipsis whitespace-nowrap"
            href={`${url.url}`}
            target="_blank"
          >
            {url.title}
          </a>
        </div>
      ))}
    </div>
  );
}

export default function WebBottomContent({ urlNewList }) {
  return (
    <div className="w-full h-[calc(100vh-200px)] overflow-hidden max-w-5xl mx-auto my-0">
      <WebUrlNewList urlNewList={urlNewList} />
    </div>
  );
}
