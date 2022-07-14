import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { getUrl } from "../utils";

const pageSizeOptions = [5, 10, 20, 50, 100];

const Record = (props) => (
  <tr>
    <td className="center">{props.index}</td>
    <td>{props.record.name}</td>
    <td>{props.record.position}</td>
    <td className="center">{props.record.level}</td>
    <td className="center">
      <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
      <button className="btn btn-link"
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

function RecordList({ setLoading }) {
  const { search } = useLocation();

  const [records, setRecords] = useState([]);
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 10,
    total: 0,
  });
  const params = search.split('&');
  const currentPage = Number(params?.[0]?.split('=')?.[1]) || 0;
  const currentPageSize = Number(params?.[1]?.split('=')?.[1]) || 10;

  const totalPage = Math.ceil(pagination?.total / currentPageSize);

  useEffect(() => {
    async function getRecords() {
      setLoading(true);
      const response = await fetch(getUrl(`/api/record?page=${currentPage}&pageSize=${currentPageSize}`));

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const res = await response.json();
      if (res?.data) {
        setRecords(res?.data);
        setPagination({
          page: res?.page,
          pageSize: res?.pageSize,
          total: res?.total,
        });
      }
      setLoading(false);
    }

    getRecords();

    return;
  }, [setLoading, currentPage]);

  async function deleteRecord(id) {
    setLoading(true);
    await fetch(getUrl(`/api/record/${id}`), {
      method: "DELETE"
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
    setLoading(false);
  }

  function recordList({ page, pageSize }) {
    return records.map((record, index) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
          index={page * pageSize + index + 1}
        />
      );
    });
  }

  return (
    <div>
      <h3>Record List</h3>
      <div className="table-scroll">
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th className="center">STT</th>
              <th>Name</th>
              <th>Position</th>
              <th className="center">Level</th>
              <th className="center">Action</th>
            </tr>
          </thead>
          <tbody>
            {recordList({ page: currentPage, pageSize: currentPageSize })}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <span>Page:</span>
        <ul>
          {
            [...Array(totalPage).keys()].map(item => {
              const actived = item == currentPage;
              return (
                <NavLink
                  key={item}
                  to={`/?page=${item}&pageSize=${currentPageSize}`}
                  className={actived ? 'actived' : ''}
                >
                  <li>
                    {item + 1}
                  </li>
                </NavLink>
              )
            })
          }
        </ul>

        <span>Page Size:</span>
        <select
          onChange={e => {
            window.location.href = `/?page=${0}&pageSize=${Number(e.target.value)}`;
          }}
          value={currentPageSize}
        >
          {
            pageSizeOptions.map(item => {
              return (
                <option key={item} value={item}>{item}</option>
              )
            })
          }
        </select>

        <span>Total:</span>
        {pagination.total}
      </div>
    </div>
  );
}

export default RecordList;