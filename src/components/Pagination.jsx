function Pagination({
  pageSize,
  setPageSize
}) {
  return (
    <select
      value={pageSize}
      onChange={(e) =>
        setPageSize(Number(e.target.value))
      }
    >
      <option value={10}>10</option>
      <option value={25}>25</option>
      <option value={50}>50</option>
      <option value={100}>100</option>
    </select>
  );
}

export default Pagination;