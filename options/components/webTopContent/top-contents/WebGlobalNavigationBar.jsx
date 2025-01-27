export default function WebGlobalNavigationBar({ urlNewList }) {
  return (
    <div className="mb-5 my-4">
      <h1 className="font-bold text-lg">Web View</h1>
      <p>
        <span className="text-2xl pe-1 inline-block">{urlNewList.length}</span>
        <span className="text-sm">개의 북마크</span>
      </p>
    </div>
  );
}
