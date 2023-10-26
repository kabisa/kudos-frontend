import styles from "./styles.module.css";

export type DataTable = {
  [key: string]: string | number | JSX.Element;
};

export type TableProps<T extends DataTable> = {
  data: T[];
};

const Table = <T extends DataTable>({ data }: TableProps<T>) => {
  if (data.length === 0) return null;
  const headers: (keyof T)[] = Object.keys(data[0]) as (keyof T)[];

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {headers.map((header, idx) => (
            <th key={idx}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            {headers.map((key, idx) => (
              <td key={idx}>{row[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
