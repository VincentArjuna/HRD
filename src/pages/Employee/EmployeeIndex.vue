<script setup lang="ts">
import Lucide from "../../base-components/Lucide";
import { Menu } from "../../base-components/Headless";
import Button from "../../base-components/Button";
import { FormInput, FormSelect } from "../../base-components/Form";
import * as xlsx from "xlsx";
import { onMounted, ref, reactive } from "vue";
import { createIcons, icons } from "lucide";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import { stringToHTML } from "../../utils/helper";
import { API } from "../../api/api";
import { Combobox } from "@headlessui/vue";

interface Response {
    name?: string;
    category?: string;
    images?: string[];
    status?: string;
}

const tableRef = ref<HTMLDivElement>();
const tabulator = ref<Tabulator>();
const filter = reactive({
    field: "profile.name",
    type: "like",
    value: "",
});
const setFilter = (value: typeof filter) => {
    Object.assign(filter, value);
};


// Redraw table onresize
const reInitOnResizeWindow = () => {
    window.addEventListener("resize", () => {
        if (tabulator.value) {
            tabulator.value.redraw();
            createIcons({
                icons,
                attrs: {
                    "stroke-width": 1.5,
                },
                nameAttr: "data-lucide",
            });
        }
    });
};

// Filter function
const onFilter = () => {
    if (tabulator.value) {
        tabulator.value.setFilter(filter.field, filter.type, filter.value);
    }
};

// On reset filter
const onResetFilter = () => {
    setFilter({
        ...filter,
        field: "name",
        type: "like",
        value: "",
    });
    onFilter();
};

// Export
const onExportCsv = () => {
    if (tabulator.value) {
        tabulator.value.download("csv", "data.csv");
    }
};

const onExportJson = () => {
    if (tabulator.value) {
        tabulator.value.download("json", "data.json");
    }
};

const onExportXlsx = () => {
    if (tabulator.value) {
        (window as any).XLSX = xlsx;
        tabulator.value.download("xlsx", "data.xlsx", {
            sheetName: "Products",
        });
    }
};

const onExportHtml = () => {
    if (tabulator.value) {
        tabulator.value.download("html", "data.html", {
            style: true,
        });
    }
};

const apiUrl = import.meta.env.VITE_API_URL;
const initTabulator = () => {
    if (tableRef.value) {
        tabulator.value = new Tabulator(tableRef.value, {
            ajaxURL: apiUrl + "/tenant/get-employee-data",

            paginationMode: "remote",
            filterMode: "remote",
            sortMode: "remote",
            printAsHtml: true,
            printStyled: true,
            pagination: true,
            paginationSize: 10,
            paginationSizeSelector: [10, 20, 30, 40],
            layout: "fitColumns",
            responsiveLayout: "collapse",
            placeholder: "No matching records found",
            columns: [
                {
                    title: "",
                    formatter: "responsiveCollapse",
                    width: 40,
                    minWidth: 30,
                    hozAlign: "center",
                    resizable: false,
                    headerSort: false,
                },
                
                // For HTML table
                {
                    title: "Employee ID",
                    field: "employee_id",
                    minWidth: 200,
                    responsive: 0,
                    frozen: true,
                    vertAlign: "middle",
                    print: false,
                    download: false,
                    hozAlign: "center",
                    headerHozAlign: "center"
                },
                {
                    title: "Branch ID",
                    field: "branch_id",
                    minWidth: 200,
                    responsive: 0,
                    vertAlign: "middle",
                    print: false,
                    download: false,
                    hozAlign: "center",
                    headerHozAlign: "center"
                },
                {
                    title: "Name",
                    field: "profile.nama",
                    minWidth: 200,
                    responsive: 0,
                    vertAlign: "middle",
                    print: false,
                    download: false,
                    hozAlign: "center",
                    headerHozAlign: "center"
                },
                // For print format

            ],
        });
    }

    tabulator.value?.on("renderComplete", () => {
        createIcons({
            icons,
            attrs: {
                "stroke-width": 1.5,
            },
            nameAttr: "data-lucide",
        });
    });
};

// Print
const onPrint = () => {
    if (tabulator.value) {
        tabulator.value.print();
    }
};
const branchList = ref([{
    name: 'Pusat'
}]);
const changeBranch = (branch: string) => {

}

onMounted(() => {
    initTabulator();
    reInitOnResizeWindow();
});

</script>

<template>
    <div class="flex flex-col items-center mt-5 intro-y sm:flex-row">
        <h2 class="mr-5 text-lg font-medium">Employee</h2>
        <div class="w-full mr-auto mt-4 sm:w-auto sm:mt-0">
            <Menu class="w-1/2 sm:w-auto ml-auto">
                <Menu.Button :as="Button" variant="outline-secondary" class="w-full sm:w-auto">
                    <Lucide icon="Building2" class="w-4 h-4 mr-2" /> Branch
                    <Lucide icon="ChevronDown" class="w-4 h-4 ml-auto sm:ml-2" />
                </Menu.Button>
                <Menu.Items class="w-40">
                    <div v-for="(branch, index) in branchList" :key="index">
                        <Menu.Item @click="changeBranch(branch.name)">
                            <Lucide icon="Building" class="w-4 h-4 mr-2" /> {{ branch.name }}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Menu>
        </div>
        <div class="flex w-full mt-4 sm:w-auto sm:mt-0">
            <Button variant="primary" class="mr-2 shadow-md">
                Add New Employee
            </Button>
            <Menu class="ml-auto sm:ml-0">
                <Menu.Button :as="Button" class="px-2 font-normal !box">
                    <span class="flex items-center justify-center w-5 h-5">
                        <Lucide icon="Plus" class="w-4 h-4" />
                    </span>
                </Menu.Button>
                <Menu.Items class="w-40">
                    <Menu.Item>
                        <Lucide icon="FilePlus" class="w-4 h-4 mr-2" /> New Category
                    </Menu.Item>
                    <Menu.Item>
                        <Lucide icon="UserPlus" class="w-4 h-4 mr-2" /> New Group
                    </Menu.Item>
                </Menu.Items>
            </Menu>
        </div>
    </div>
    <!-- BEGIN: HTML Table Data -->
    <div class="px-5 py-3 mt-3 intro-y box">
        <div class="flex flex-col sm:flex-row sm:items-end xl:items-start">
            <form id="tabulator-html-filter-form" class="xl:flex sm:mr-auto" @submit="(e: Event) => {
                e.preventDefault();
                onFilter();
            }
                ">
                <div class="items-center sm:flex sm:mr-4">
                    <label class="flex-none w-12 mr-2 xl:w-auto xl:flex-initial">
                        Field
                    </label>
                    <FormSelect id="tabulator-html-filter-field" v-model="filter.field"
                        class="w-full mt-2 2xl:w-full sm:mt-0 sm:w-auto">
                        <option value="name">Name</option>
                        <option value="category">Category</option>
                    </FormSelect>
                </div>
                <div class="items-center mt-2 sm:flex sm:mr-4 xl:mt-0">
                    <label class="flex-none w-12 mr-2 xl:w-auto xl:flex-initial">
                        Type
                    </label>
                    <FormSelect id="tabulator-html-filter-type" v-model="filter.type" class="w-full mt-2 sm:mt-0 sm:w-auto">
                        <option value="like">like</option>
                        <option value="=">=</option>
                        <option value="<">&lt;</option>
                        <option value="<=">&lt;=</option>
                        <option value=">">&gt;</option>
                        <option value=">=">&gt;=</option>
                        <option value="!=">!=</option>
                    </FormSelect>
                </div>
                <div class="items-center mt-2 sm:flex sm:mr-4 xl:mt-0">
                    <label class="flex-none w-12 mr-2 xl:w-auto xl:flex-initial">
                        Value
                    </label>
                    <FormInput id="tabulator-html-filter-value" v-model="filter.value" type="text"
                        class="mt-2 sm:w-40 2xl:w-full sm:mt-0" placeholder="Search..." />
                </div>
                <div class="mt-2 xl:mt-0">
                    <Button id="tabulator-html-filter-go" variant="primary" type="button" class="w-full sm:w-16"
                        @click="onFilter">
                        Go
                    </Button>
                    <Button id="tabulator-html-filter-reset" variant="secondary" type="button"
                        class="w-full mt-2 sm:w-16 sm:mt-0 sm:ml-1" @click="onResetFilter">
                        Reset
                    </Button>
                </div>
            </form>
            <div class="flex flex-wrap mt-5 sm:mt-0">
                <Button id="tabulator-print" variant="outline-secondary" class="w-1/2 mr-2 sm:w-auto" @click="onPrint">
                    <Lucide icon="Printer" class="w-4 h-4 mr-2" /> Print
                </Button>
                <Menu class="w-1/2 sm:w-auto mr-2">
                    <Menu.Button :as="Button" variant="outline-secondary" class="w-full sm:w-auto">
                        <Lucide icon="FileText" class="w-4 h-4 mr-2" /> Export
                        <Lucide icon="ChevronDown" class="w-4 h-4 ml-auto sm:ml-2" />
                    </Menu.Button>
                    <Menu.Items class="w-40">
                        <Menu.Item @click="onExportCsv">
                            <Lucide icon="FileText" class="w-4 h-4 mr-2" /> Export CSV
                        </Menu.Item>
                        <Menu.Item @click="onExportJson">
                            <Lucide icon="FileText" class="w-4 h-4 mr-2" /> Export JSON
                        </Menu.Item>
                        <Menu.Item @click="onExportXlsx">
                            <Lucide icon="FileText" class="w-4 h-4 mr-2" /> Export XLSX
                        </Menu.Item>
                        <Menu.Item @click="onExportHtml">
                            <Lucide icon="FileText" class="w-4 h-4 mr-2" /> Export HTML
                        </Menu.Item>
                    </Menu.Items>
                </Menu>
                <Button id="tabulator-upload" variant="outline-secondary" class="w-1/2 mr-2 sm:w-auto" @click="onPrint">
                    <Lucide icon="ArchiveRestore" class="w-4 h-4 mr-2" /> Upload
                </Button>
            </div>
        </div>
        <div class="overflow-x-auto scrollbar-hidden">
            <div id="tabulator" ref="tableRef" class="mt-5"></div>
        </div>
    </div>
    <!-- END: HTML Table Data -->
    <!-- END: Page Layout -->
</template>
  