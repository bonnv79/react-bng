import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUrl } from "../utils";

const Record = (props) => (
  <tr>
    <td>{props.record.name}</td>
    <td>{props.record.position}</td>
    <td>{props.record.level}</td>
    <td>
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

export default function RecordList({ setLoading }) {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function getRecords() {
      setLoading(true);
      const response = await fetch(getUrl('/api/record'));

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const res = await response.json();
      if (res?.data) {
        setRecords(res?.data);
      }
      setLoading(false);
    }

    getRecords();

    return;
  }, [records.length, setLoading]);

  async function deleteRecord(id) {
    setLoading(true);
    await fetch(getUrl(`/api/record/${id}`), {
      method: "DELETE"
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
    setLoading(false);
  }

  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }

  return (
    <div>
      <h3>Record List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Level</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
}
