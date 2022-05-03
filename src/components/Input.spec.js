import { render } from "@testing-library/react";
import Input from "./Input";

it("has is-invalid class for input when help is set", () => {
    const {container} = render(<Input help="this is error msg" />);
    const input = container.querySelector("input");

    expect(input.classList).toContain("is-invalid");
});

it("has invalid-feedback class for span when help is set", () => {
    const {container} = render(<Input help="this is error msg" />);
    const span = container.querySelector("span");

    expect(span.classList).toContain("invalid-feedback");
});

it("does not have the is-invalid class for input when help is not set", () => {
    const {container} = render(<Input />);
    const input = container.querySelector("input");

    expect(input.classList).not.toContain("is-invalid");
});