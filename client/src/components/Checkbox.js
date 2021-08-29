import React, { useState } from "react";
import { getFilteredTickets } from "../utils/api";

const Checkbox = ({ categories, handleFilters }) => {
    const [checked, setChecked] = useState([]);

    const handleToggle = c => () => {
        getFilteredTickets(c.name)
    };

    return categories.map((c, i) => (
        <li key={i} className="list-unstyled text-light">
            <input
                onChange={handleToggle(c)}
                value={c.name}
                type="checkbox"
                className="form-check-input"
            />
            <label className="form-check-label">{c.name}</label>
        </li>
    ));
};

export default Checkbox;