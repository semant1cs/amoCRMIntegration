import axios from "axios";

export type DataType = {
  key: string;
  name: string;
  budget: number;
  status: string;
  responsible: string;
  date: Date;
};

export type ColumnType = {
  title: string;
  dataIndex?: string;
  key: string;
};

export function getColumns() {
  const columns: ColumnType[] = [
    {
      title: "Название",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Бюджет",
      dataIndex: "budget",
      key: "budget",
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Ответственный",
      key: "responsible",
      dataIndex: "responsible",
    },
    {
      title: "Дата создания",
      key: "date",
      dataIndex: "date",
    },
    {
      title: "Действие",
      key: "action",
    },
  ];
  return columns;
}

export async function getData() {
  return await axios.get("http://localhost:3000/api/leads").then((response) => response.data);
}
