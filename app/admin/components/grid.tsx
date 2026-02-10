import { filterType } from "../farmers/page";
export const Grid = <T,>({
  searchValue,
  filters,
  data,
  datatype,
  Card
}: {
  filters: filterType[];
  searchValue: string;
  datatype: any;
  data: InstanceType<typeof datatype>[];
  Card:React.ComponentType<{ data: T }>;
}) => {
  type FilterColumn = keyof any;
  const filteredData:any[] = data.filter((f: any) => {
    const search = searchValue.toLowerCase().trim();
    const searchMatch =
      !search ||
      f.name.toLowerCase().includes(search) ||
      String(f.farmerId).includes(search);

    const allFiltersMatch = filters.every((filter) => {
      const selected = filter.filterSelected;
      const defaultValue = filter.filterValue[0];
      const column = filter.filterColoumnName as FilterColumn;
      console.log(column);
      return (
        selected === defaultValue || (f[column] as string[]).includes(selected)
      );
    });
    console.log(allFiltersMatch);
    return searchMatch && allFiltersMatch;
  });
  ``;
  if (filteredData.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">No farmers found</div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-5 mt-10">
      {filteredData.map((data,i) => (
        <Card key={i} data={data}/>))}
    </div>
  );
};
