import { nestcribe_path as test } from "../../tests/utils";

import BaseModel from "./BaseModel";

test("Entreprise/BaseModel", () => {
  const data = { some_data: "foo", bar: "baz" };
  it("constructs with data", () => {
    const model = new BaseModel(data);

    expect(model).toBeInstanceOf(BaseModel);
    expect(model.some_data).toEqual(data.some_data);
  });

  it("deny write access to data", () => {
    const model = new BaseModel(data);

    expect(() => {
      model.some_data = true;
    }).toThrow("Cannot set property");
  });

  it("can be updated with data", () => {
    const model = new BaseModel(data);

    // Data exists
    expect(model.some_data).toEqual(data.some_data);
    expect(model.bar).toEqual(data.bar);

    // We update data
    model.updateData({ new_data: 123, bar: "new" });

    // New data
    expect(model.new_data).toEqual(123);
    // Still exists
    expect(model.some_data).toEqual(data.some_data);
    // Changed
    expect(model.bar).not.toEqual(data.bar);
    expect(model.bar).toEqual("new");

    model.updateData(777); // Will silently fail
  });

  it("can replace all data", () => {
    const model = new BaseModel(data);

    // Data exists
    expect(model.some_data).toEqual(data.some_data);
    expect(model.bar).toEqual(data.bar);

    // We update data
    model.replaceData({ new_data: 123, bar: "new" });

    // New data
    expect(model.new_data).toEqual(123);

    // Doesn't exist anymore
    expect(model.some_data).toBe(undefined);
  });
});
