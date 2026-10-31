const test = require("node:test");
const assert = require("node:assert");
const {buildTestCommand} = require("../.gdunit4_action/unit-test/index.js");

test("runs the tests with a virtual display by default", () => {
  const {command, args} = buildTestCommand(["res://tests/"], "--verbose", false);

  assert.strictEqual(command, "xvfb-run");
  assert.deepStrictEqual(args, [
    "--auto-servernum",
    "./addons/gdUnit4/runtest.sh",
    "--audio-driver Dummy",
    "--display-driver x11",
    "--rendering-driver opengl3",
    "--single-window",
    "--continue",
    "--add res://tests/",
    "--verbose"
  ]);
});

test("runs the tests in headless mode without a virtual display", () => {
  const {command, args} = buildTestCommand(["res://tests/"], "--verbose", true);

  assert.strictEqual(command, "./addons/gdUnit4/runtest.sh");
  assert.deepStrictEqual(args, [
    "--headless",
    "--audio-driver Dummy",
    "--continue",
    "--add res://tests/",
    "--verbose"
  ]);
});

test("adds every test path in headless mode", () => {
  const {args} = buildTestCommand(["res://tests/", "res://tests-2/"], "", true);

  assert.deepStrictEqual(args.filter((arg) => arg.startsWith("--add")), [
    "--add res://tests/",
    "--add res://tests-2/"
  ]);
});
