import { TableVirtuoso } from "react-virtuoso";
import { generateUsers } from "./data";
import { useMemo, useState } from "react";
import { Label, Icon, MenuItem } from "@blueprintjs/core";
import { MultiSelect } from "@blueprintjs/select";

function useFilter(source) {
  const [data, setData] = useState(source);
  return {
    data,
    actions: {}
  };
}

function Filter(props) {
  const fields = useMemo(() => {
    let map = {};
    props.data.forEach((item) => {
      Object.keys(item).forEach((k) => {
        if (map[k]) {
          map[k].add(item[k]);
        } else {
          map[k] = new Set();
        }
      });
    });
    return map;
  }, [props.data]);
  console.log(fields);
  return (
    <div>
      <strong>Filters</strong>
      <section title="filter">
        {Object.keys(fields).map((k) => {
          return (
            <Label>
              <Icon icon="menu" />
              {k}
            </Label>
          );
        })}
      </section>
    </div>
  );
}
export default function App() {
  const originSource = generateUsers(100000);
  const filtered = useFilter(originSource);
  return (
    <div>
      <Filter {...filtered} />
      <TableVirtuoso
        style={{ height: 400 }}
        data={filtered.data}
        fixedHeaderContent={() => (
          <tr>
            <th style={{ width: 150, background: "white" }}>Name</th>
            <th style={{ background: "white", width: 250 }}>JobTitle</th>
            <th style={{ background: "white", width: 350 }}>Description</th>
          </tr>
        )}
        itemContent={(index, user) => (
          <>
            <td style={{ width: 150 }}>{user.name}</td>
            <td style={{}}>{user.jobTitle}</td>
            <td style={{ backgroundColor: user.bgColor }}>
              {user.description}
            </td>
          </>
        )}
      />
    </div>
  );
}
