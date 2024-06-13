<script lang="ts">
import { getData, getColumns, DataType, ColumnType } from "./api";

type contractTypeLead = {
  key: string;
  name: string;
  price: number;
  status: string;
  responsible_user_id: string;
  created_at: string;
};

export default {
  data() {
    return { columns: [] as ColumnType[], data: [] as contractTypeLead[] };
  },
  beforeMount() {
    this.formTable();
  },
  methods: {
    async formTable() {
      this.columns = getColumns();

      this.data = await getData();
    },
    removeRecord(record: DataType) {
      this.data = this.data.filter((dataRecord: contractTypeLead) => dataRecord.key !== record.key);
    },
  },
};
</script>

<template>
  <a-table :columns="columns" :data-source="data">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'title'">
        <span> {{ column.name }} </span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <a>
          {{ record.name }}
        </a>
      </template>
      <template v-else-if="column.key === 'budget'">
        <span>
          {{ record.budget.toLocaleString("ru") }}
        </span>
      </template>
      <template v-else-if="column.key === 'status'">
        <span>
          <a-tag color="geekblue">
            {{ record.status.toString().toUpperCase() }}
          </a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'date'">
        <span>
          <span>
            {{ new Date(record.date * 1000).toLocaleString("ru").slice(0, -3) }}
          </span>
        </span>
      </template>
      <template v-else-if="column.key === 'responsible'">
        <span>
          <a-avatar size="small" style="color: #f56a00; background-color: #fde3cf"> {{ record.responsible[0] }} </a-avatar>
          {{ record.responsible }}
        </span>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a-divider type="vertical" />
          <a-button @click="removeRecord(record)">
            <a>Удалить</a>
          </a-button>
          <a-divider type="vertical" />
        </span>
      </template>
    </template>
  </a-table>
</template>

<style scoped></style>
