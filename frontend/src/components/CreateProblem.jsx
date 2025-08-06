import { useState } from "react";
import axios from "axios";
import { baseurl } from "../App";

const CreateProblem = () => {
  const [formData, setFormData] = useState({
    title: "",
    statement: "",
    test_input: [""],
    test_output: [""],
    tags: [""],
    constraints: [""],
    sampleInputs: [""],
    sampleOutputs: [""],
  });

  const handleChange = (e, field, index = null) => {
    const value = e.target.value;

    if (index !== null) {
      const updated = [...formData[field]];
      updated[index] = value;
      setFormData({ ...formData, [field]: updated });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const addField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const removeField = (field, index) => {
    const updated = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("Token"); // ensure you store it on login
    try {
      await axios.post(
        baseurl+"api/problem/create",
        { ...formData, user: "admin" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Problem created successfully!");
    } catch (err) {
      console.error(err);
      alert("Error creating problem");
    }
  };

  const renderFieldList = (label, field) => (
    <div className="mb-4">
      <label className="font-semibold block mb-2">{label}</label>
      {formData[field].map((val, i) => (
        <div key={i} className="flex gap-2 mb-2">
          <input
            type="text"
            className="border p-2 flex-1"
            value={val}
            onChange={(e) => handleChange(e, field, i)}
          />
          <button
            type="button"
            onClick={() => removeField(field, i)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            X
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => addField(field)}
        className="bg-blue-500 text-white px-3 py-1 rounded"
      >
        Add {label}
      </button>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Create New Problem
      </h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-semibold">Title</label>
        <input
          type="text"
          className="w-full border p-2 mb-4"
          value={formData.title}
          onChange={(e) => handleChange(e, "title")}
          required
        />

        <label className="block mb-2 font-semibold">Statement</label>
        <textarea
          className="w-full border p-2 mb-4 h-32"
          value={formData.statement}
          onChange={(e) => handleChange(e, "statement")}
          required
        />

        {renderFieldList("Tags", "tags")}
        {renderFieldList("Constraints", "constraints")}
        {renderFieldList("Sample Inputs", "sampleInputs")}
        {renderFieldList("Sample Outputs", "sampleOutputs")}
        {renderFieldList("Test Inputs", "test_input")}
        {renderFieldList("Test Outputs", "test_output")}

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Submit Problem
        </button>
      </form>
    </div>
  );
};

export default CreateProblem;
