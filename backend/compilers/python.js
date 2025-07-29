import { exec } from "child_process";
import fs from "fs";
import path from "path";

export const runPython = (code, input) => {
  return new Promise((resolve, reject) => {
    const fileId = Date.now();
    const pyPath = path.join("temp", `code_${fileId}.py`);
    const inputPath = path.join("temp", `input_${fileId}.txt`);

    fs.writeFileSync(pyPath, code);
    fs.writeFileSync(inputPath, input);

    exec(
      `python ${pyPath} < ${inputPath}`,
      { timeout: 5000 },
      (err, stdout, stderr) => {
        cleanup();
        if (err || stderr) return reject(stderr || err.message);
        resolve(stdout);
      }
    );

    function cleanup() {
      [pyPath, inputPath].forEach((f) => fs.existsSync(f) && fs.unlinkSync(f));
    }
  });
};
