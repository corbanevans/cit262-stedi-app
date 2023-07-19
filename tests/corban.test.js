import name from "../server.js";

it("Should say Hello Corban", async ()=>{
    const response = await fetch('http://localhost:3000/corban');
    const name = await response.text();

    expect(name).toBe("Hello Corban");
})