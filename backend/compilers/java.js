import { exec } from "child_process";
import fs from "fs";
import path from "path";

export const runJava = (code, input) => {
  return new Promise((resolve, reject) => {
    const fileId = Date.now();
    const className = `Main${fileId}`; // Unique class name
    const javaFile = path.join("temp", `${className}.java`);
    const inputFile = path.join("temp", `input_${fileId}.txt`);
    const classFile = path.join("temp", `${className}.class`);

    // Replace any 'class Main' with the dynamic className
    const modifiedCode = code.replace(/class\s+Main\b/, `class ${className}`);

    fs.writeFileSync(javaFile, modifiedCode);
    fs.writeFileSync(inputFile, input);

    // Compile and run Java
    const command = `javac ${javaFile} && java -cp temp ${className} < ${inputFile}`;
    exec(command, { timeout: 5000 }, (err, stdout, stderr) => {
      cleanup();

      if (err || stderr) {
        return reject(stderr || err.message);
      }
      resolve(stdout);
    });

    function cleanup() {
      [javaFile, inputFile, classFile].forEach((file) => {
        if (fs.existsSync(file)) fs.unlinkSync(file);
      });
    }
  });
};
