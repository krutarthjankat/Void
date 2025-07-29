import { exec } from "child_process";
import fs from "fs";
import path from "path";

export const runCpp = (code, input) => {
  return new Promise((resolve, reject) => {
    const fileId = Date.now();
    const cppPath = path.join("temp", `code_${fileId}.cpp`);
    const inputPath = path.join("temp", `input_${fileId}.txt`);
    const outputExe = path.join("temp", `a_${fileId}.out`);

    fs.writeFileSync(cppPath, code);
    fs.writeFileSync(inputPath, input);

    exec(
      `g++ ${cppPath} -o ${outputExe} && ${outputExe} < ${inputPath}`,
      (err, stdout, stderr) => {
        cleanup();
        if (err || stderr) return reject(stderr || err.message);
        resolve(stdout);
      }
    );

    function cleanup() {
      [cppPath, inputPath, outputExe].forEach(
        (f) => fs.existsSync(f) && fs.unlinkSync(f)
      );
    }
  });
};
