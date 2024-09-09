"use client";
import { chapterMassAction, topicMassAction } from "@/services/editor";
import TableContainer from "@mui/material/TableContainer";
import TableSortLabel from "@mui/material/TableSortLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import ChapterDeleteModal from "../ChapterDeleteModal";

import TooltipIcon from "@/assets/images/TooltipIcon.svg";
import FormControl from "@mui/material/FormControl";
import TopicDeleteModal from "../TopicDeleteModal";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import { useEffect, useState } from "react";
import Select from "@mui/material/Select";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";

import Image from "next/image";
import "./CoursesTable.scss";
import { useMemo } from "react";

const RenderTooltip = ({ list = [], text = "" }) => {
  return (
    <span className="courseStructure_tableTooltip">
      <Tooltip
        title={
          <div className="courseStructure_tableTooltip_Main">
            {list.length > 0 && (
              <ul>
                {list.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
            {text}
          </div>
        }
        placement="top"
        id="courseStructureTableTooltip"
      >
        <Image src={TooltipIcon} alt="tooltip icon" />
      </Tooltip>
    </span>
  );
};

const CoursesTable = ({
  TableRows,
  TableColumns,
  filterActions = [],
  topicList = false,
  header = true,
  token,
  updateData,
  rawData = [],
  course,
  createTableData = () => {},
}) => {
  const [rows, setRows] = useState(TableRows);

  const [columns, setColumns] = useState([...TableColumns]);
  const [selectedRowsCount, setSelectedRowsCount] = useState(0);
  const [chapterDeleteModalOpen, setChapterDeleteModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [topicDeleteModalOpen, setTopicDeleteModalOpen] = useState(false);
  const [action, setAction] = useState("");

  /*** Sorting Algorithm ** */
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("identifier");

  const descendingComparator = (a, b, orderBy) => {
    if (orderBy === "name") {
      if (b["name"]?.props?.children < a["name"].props?.children) {
        return -1;
      }
      if (b["name"]?.props?.children > a["name"]?.props?.children) {
        return 1;
      }
    } else {
      if (b[orderBy] < a[orderBy]) {
        return -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return 1;
      }
    }
    return 0;
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });

    return stabilizedThis.map((el) => el[0]);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const visibleRows = useMemo(
    () => stableSort(rows, getComparator(order, orderBy)),
    [order, orderBy, rows]
  );

  useEffect(() => {
    setRows(TableRows);
  }, [TableRows]);

  useEffect(() => {
    setColumns(TableColumns);
  }, [TableColumns]);

  const handleHeaderCheckbox = (index) => {
    const tempColumns = [...columns];
    const value = tempColumns[index].checked;
    tempColumns[index] = { ...columns[index], checked: !value };
    setColumns([...tempColumns]);
    let tempRows = [];
    if (!value) {
      tempRows = rows.map((r) => ({ ...r, checked: true }));
      setSelectedRowsCount(rows?.length);
      setSelectedRows(rows);
    } else {
      tempRows = rows.map((r) => ({ ...r, checked: false }));
      setSelectedRows([]);
      setSelectedRowsCount(0);
    }
    setRows([...tempRows]);
  };

  const handleRowCheckbox = (index) => {
    const tempRows = [...rows];
    const value = tempRows[index].checked;
    tempRows[index] = { ...tempRows[index], checked: !value };
    setRows(tempRows);
    const filtered = tempRows?.filter((r) => r.checked);
    setSelectedRows(filtered);
    setSelectedRowsCount(filtered?.length);
    const tempColumns = [...columns];
    if (
      filtered?.length === rows?.length &&
      !columns[tempColumns?.length - 1]?.checked
    ) {
      tempColumns[tempColumns?.length - 1] = {
        ...columns[tempColumns?.length - 1],
        checked: true,
      };
      setColumns([...tempColumns]);
    }
    if (
      filtered?.length !== rows?.length &&
      columns[tempColumns?.length - 1]?.checked
    ) {
      tempColumns[tempColumns?.length - 1] = {
        ...columns[tempColumns?.length - 1],
        checked: false,
      };
      setColumns([...tempColumns]);
    }
  };

  const handleChapterAction = async () => {
    const Ids = [];
    selectedRows?.forEach((row) => Ids.push(`${row?.objId}`));
    const response = await chapterMassAction(token, Ids, action);
    if (response?.result === "ok") {
      setSelectedRowsCount(0);
      setSelectedRows([]);
      updateData(false);
      const tempColumns = [...columns];
      tempColumns[tempColumns?.length - 1] = {
        ...columns[tempColumns?.length - 1],
        checked: false,
      };
      setColumns([...tempColumns]);
      setAction("");
    } else {
      if (
        response?.message === "Some chapters have topics" &&
        action === filterActions[1].value
      ) {
        setChapterDeleteModalOpen(true);
      }
    }
  };

  const handleTopicAction = async () => {
    if (action === filterActions[1].value) {
      setTopicDeleteModalOpen(true);
    } else {
      const Ids = [];
      selectedRows?.forEach((row) => Ids.push(`${row?.id}`));

      const response = await topicMassAction(token, Ids, action);
      if (response?.status) {
        setSelectedRowsCount(0);
        setSelectedRows([]);
        updateData(false);
        const tempColumns = [...columns];
        tempColumns[tempColumns?.length - 1] = {
          ...columns[tempColumns?.length - 1],
          checked: false,
        };
        setColumns([...tempColumns]);
        setAction("");
      }
    }
  };

  const handleGo = () => {
    if (!topicList) {
      handleChapterAction();
    } else {
      handleTopicAction();
    }
  };

  return (
    <>
      <ChapterDeleteModal
        isOpen={chapterDeleteModalOpen}
        setIsOpen={setChapterDeleteModalOpen}
      />
      <TopicDeleteModal
        isOpen={topicDeleteModalOpen}
        setIsOpen={setTopicDeleteModalOpen}
        selectedRows={selectedRows}
        token={token}
        action={action}
        course={course}
        updateData={updateData}
        setSelectedRowsCount={setSelectedRowsCount}
        setSelectedRows={setSelectedRows}
        columns={columns}
        setColumns={setColumns}
        setAction={setAction}
      />

      {header && (
        <div className="courseStructure_TableHeader">
          <label
            htmlFor="courseStructureTableOptions"
            style={{ color: "var(--text_primary)" }}
          >
            Action:
          </label>
          <FormControl className="courseStructure_TableDropdown">
            <Select
              labelId="courseStructureTableOptions"
              id="courseStructureTableOptions"
              value={action}
              onChange={(e) => setAction(e.target.value)}
              displayEmpty
              input={<OutlinedInput />}
            >
              {filterActions.map((action, i) => (
                <MenuItem key={i} value={action.value}>
                  {action.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <button onClick={handleGo} disabled={!selectedRowsCount}>
            Go
          </button>
          <span style={{ color: "var(--text_primary)" }}>
            {selectedRowsCount} out of {rows?.length} selected
          </span>
        </div>
      )}
      <Paper
        className={`courseStructure_table ${
          topicList ? "courseStructure_tableTopicList" : ""
        }`}
      >
        <TableContainer className="coursesTable_container" style={{}}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead style={{ position: "sticky", top: "0" }}>
              <TableRow>
                {columns.map((column, i) => (
                  <TableCell
                    key={i}
                    align={column.align}
                    style={column.style}
                    id={column.id}
                    sortDirection={orderBy === column.id ? order : false}
                  >
                    {column.id ? (
                      <TableSortLabel
                        style={{ color: "var(--text_primary)" }}
                        id={column.id}
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? order : "asc"}
                        onClick={() => handleRequestSort(column.id)}
                      >
                        {column.label}

                        {column.type === "checkbox" && (
                          <input
                            type="checkbox"
                            onClick={() => handleHeaderCheckbox(i)}
                            checked={column.checked}
                            readOnly
                          />
                        )}
                      </TableSortLabel>
                    ) : (
                      <>
                        {column.label}

                        {column.type === "checkbox" && (
                          <input
                            type="checkbox"
                            onClick={() => handleHeaderCheckbox(i)}
                            checked={column.checked}
                            readOnly
                          />
                        )}
                      </>
                    )}
                    {column?.tooltip && (
                      <RenderTooltip
                        list={column?.tooltip?.list}
                        text={column?.tooltip?.text}
                      />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows?.map((row, i) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={column.style}
                        title={column.style ? value : ""}
                      >
                        <>
                          {value}
                          {typeof value === "boolean" && (
                            <input
                              type="checkbox"
                              checked={value}
                              readOnly
                              onClick={() => handleRowCheckbox(i)}
                            />
                          )}
                        </>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default CoursesTable;
