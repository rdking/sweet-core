import test from 'ava';
import fs from 'fs';

import { compile } from '../../src/sweet.js';
import NodeLoader from '../../src/node-loader';

// TODO: make these pass
const passExcluded = [
  // known problems with the reader
  '1252.script.js',
  '978.script.js',
  '953.script.js',
  '952.script.js',
  '951.script.js',
  '950.script.js',
  '949.script.js',
  '947.script.js',
  '669.script.js',
  '582.script.js',
  '348.script.js',
  '315.script.js',
  '314.script.js',
  '311.script.js',
  '299.script.js',
  '211.script.js',
  '210.script.js',
  '1657.script.js',
  '1656.script.js',
  '1655.script.js',
  '1654.script.js',
  '1328.script.js',

  '1012.script.js',
  '1057.module.js',
  '106.script.js',
  '1073.script.js',
  '1074.script.js',
  '1077.script.js',
  '1116.module.js',
  '1117.module.js',
  '1118.module.js',
  '1119.module.js',
  '1120.module.js',
  '1121.module.js',
  '1122.module.js',
  '1123.module.js',
  '1124.module.js',
  '1125.module.js',
  '1126.module.js',
  '1127.module.js',
  '1128.script.js',
  '1129.script.js',
  '1130.script.js',
  '1131.script.js',
  '1138.script.js',
  '1166.script.js',
  '117.script.js',
  '1202.script.js',
  '1239.script.js',
  '1240.script.js',
  '1245.script.js',
  '1246.script.js',
  '1247.script.js',
  '1248.script.js',
  '128.script.js',
  '1307.script.js',
  '1319.script.js',
  '1334.script.js',
  '1335.script.js',
  '1364.script.js',
  '1370.script.js',
  '140.script.js',
  '1427.script.js',
  '1428.script.js',
  '1429.script.js',
  '1430.script.js',
  '1431.script.js',
  '1432.script.js',
  '1434.script.js',
  '1467.script.js',
  '1623.script.js',
  '1638.script.js',
  '1686.module.js',
  '1687.module.js',
  '1688.module.js',
  '1689.module.js',
  '1692.module.js',
  '1736.script.js',
  '1739.script.js',
  '1745.script.js',
  '1779.script.js',
  '1789.script.js',
  '1844.script.js',
  '1954.script.js',
  '285.script.js',
  '290.script.js',
  '295.script.js',
  '296.script.js',
  '297.script.js',
  '301.script.js',
  '350.script.js',
  '37.script.js',
  '389.script.js',
  '391.script.js',
  '393.script.js',
  '412.module.js',
  '414.module.js',
  '415.module.js',
  '416.module.js',
  '417.module.js',
  '418.module.js',
  '419.module.js',
  '420.module.js',
  '516.script.js',
  '523.module.js',
  '533.script.js',
  '538.script.js',
  '572.script.js',
  '583.script.js',
  '608.script.js',
  '679.script.js',
  '680.script.js',
  '681.script.js',
  '84.script.js',
  '95.script.js',
  '993.script.js',
  '995.script.js',
];

const failExcluded = [
  // TODO: remove the following three after transform destructuring refactor
  '160.script.js',
  '822.script.js',
  '833.script.js',

  '0.script.js',
  '19.script.js',
  '22.script.js',
  '23.script.js',
  '26.script.js',
  '27.script.js',
  '28.script.js',
  '29.script.js',
  '30.script.js',
  '31.script.js',
  '32.script.js',
  '33.script.js',
  '34.script.js',
  '36.script.js',
  '37.script.js',
  '38.script.js',
  '39.script.js',
  '41.script.js',
  '43.script.js',
  '46.script.js',
  '47.script.js',
  '48.script.js',
  '49.script.js',
  '50.script.js',
  '52.script.js',
  '53.script.js',
  '54.script.js',
  '55.script.js',
  '57.script.js',
  '88.script.js',
  '93.script.js',
  '106.script.js',
  '108.script.js',
  '109.script.js',
  '110.script.js',
  '111.script.js',
  '112.script.js',
  '113.script.js',
  '118.script.js',
  '125.script.js',
  '129.script.js',
  '130.script.js',
  '131.script.js',
  '132.script.js',
  '133.script.js',
  '134.script.js',
  '135.script.js',
  '137.script.js',
  '141.script.js',

  '150.script.js',
  '152.script.js',
  '163.script.js',
  '167.script.js',
  '168.script.js',
  '169.script.js',
  '170.script.js',
  '172.script.js',
  '173.script.js',
  '174.script.js',
  '176.script.js',
  '183.script.js',
  '185.script.js',
  '186.script.js',
  '188.script.js',
  '191.script.js',
  '193.script.js',
  '194.script.js',
  '204.script.js',
  '205.script.js',
  '206.script.js',
  '207.script.js',
  '208.script.js',
  '209.script.js',
  '210.script.js',
  '211.script.js',
  '212.script.js',
  '214.script.js',
  '217.script.js',
  '218.script.js',
  '221.script.js',
  '223.script.js',
  '235.script.js',
  '236.script.js',
  '245.script.js',
  '246.script.js',
  '247.script.js',
  '259.script.js',
  '260.script.js',
  '266.script.js',
  '267.script.js',
  '268.script.js',
  '269.script.js',
  '270.script.js',
  '271.script.js',
  '274.script.js',
  '276.script.js',
  '288.script.js',
  '289.script.js',
  '291.script.js',
  '292.script.js',
  '293.script.js',
  '294.script.js',
  '295.script.js',
  '296.script.js',
  '298.script.js',
  '314.script.js',
  '323.script.js',
  '324.script.js',
  '325.script.js',
  '326.script.js',
  '327.script.js',
  '328.script.js',
  '329.script.js',
  '330.script.js',
  '331.script.js',
  '332.script.js',
  '333.script.js',
  '334.script.js',
  '335.script.js',
  '336.script.js',
  '337.script.js',
  '348.script.js',
  '350.script.js',
  '351.script.js',
  '355.script.js',
  '356.script.js',
  '366.script.js',
  '371.script.js',
  '377.script.js',
  '378.script.js',
  '381.script.js',
  '382.script.js',
  '404.script.js',
  '405.script.js',
  '406.script.js',
  '408.script.js',
  '411.script.js',
  '412.script.js',
  '414.script.js',
  '416.script.js',
  '418.script.js',
  '419.script.js',
  '426.script.js',
  '433.script.js',
  '441.script.js',
  '442.script.js',
  '443.script.js',
  '444.script.js',
  '445.script.js',
  '446.script.js',
  '447.script.js',
  '448.script.js',
  '449.script.js',
  '452.script.js',
  '453.script.js',
  '454.script.js',
  '458.script.js',
  '470.script.js',
  '473.script.js',
  '474.script.js',
  '475.script.js',
  '503.script.js',
  '505.script.js',
  '506.script.js',
  '507.script.js',
  '508.script.js',
  '509.script.js',
  '510.script.js',
  '511.script.js',
  '512.script.js',
  '515.script.js',
  '516.script.js',
  '517.script.js',
  '518.script.js',
  '520.script.js',
  '524.script.js',
  '526.script.js',
  '532.script.js',
  '534.script.js',
  '571.script.js',
  '574.script.js',
  '578.script.js',
  '579.script.js',
  '582.script.js',
  '585.script.js',
  '586.script.js',
  '590.script.js',
  '591.script.js',
  '594.script.js',
  '595.script.js',
  '598.script.js',
  '599.script.js',
  '606.script.js',
  '607.script.js',
  '608.script.js',
  '610.script.js',
  '613.script.js',
  '614.script.js',
  '616.script.js',
  '618.script.js',
  '619.script.js',
  '626.script.js',
  '627.script.js',
  '628.script.js',
  '629.script.js',
  '630.script.js',
  '631.script.js',
  '632.script.js',
  '633.script.js',
  '634.script.js',
  '638.script.js',
  '639.script.js',
  '643.script.js',
  '655.script.js',
  '658.script.js',
  '689.script.js',
  '690.script.js',
  '691.script.js',
  '692.script.js',
  '693.script.js',

  '694.script.js', // this test #= (something that COULD pass depending on readtable)

  '704.script.js',
  '708.script.js',
  '709.script.js',
  '716.script.js',
  '719.script.js',
  '720.script.js',
  '721.script.js',
  '763.script.js',
  '765.script.js',
  '766.script.js',
  '773.script.js',
  '774.script.js',
  '775.script.js',
  '776.script.js',
  '780.script.js',
  '781.script.js',
  '782.script.js',
  '784.script.js',
  '787.script.js',
  '789.script.js',
  '791.script.js',
  '792.script.js',
  '793.script.js',
  '798.script.js',
  '799.script.js',
  '800.script.js',
  '801.script.js',
  '802.script.js',
  '803.script.js',
  '804.script.js',
  '805.script.js',
  '806.script.js',
  '807.script.js',
  '808.script.js',
  '809.script.js',
  '810.script.js',
  '811.script.js',
  '812.script.js',
  '813.script.js',
  '814.script.js',
  '815.script.js',
  '816.script.js',
  '817.script.js',
  '818.script.js',
  '819.script.js',
  '820.script.js',
  '843.script.js',
  '847.script.js',
  '903.script.js',
  '905.script.js',
  '906.script.js',
  '918.script.js',
  '919.script.js',
  '920.script.js',
  '921.script.js',
  '922.script.js',
  '923.script.js',
  '926.script.js',
  '931.script.js',
  '942.script.js',
  '956.script.js',
  '957.script.js',
  '958.script.js',
  '959.script.js',
  '960.script.js',
  '961.script.js',
  '962.script.js',
  '963.script.js',
  '964.script.js',
  '970.script.js',
  '972.script.js',
  '974.script.js',
  '975.script.js',
  '977.script.js',
  '983.script.js',

  '739.module.js',
  '912.module.js',
  '913.module.js',
  '924.module.js',
  '965.module.js',

  // these tests hang
  '15.script.js',
  '16.script.js',
  '233.script.js',
  '287.script.js',
  '472.script.js',
  '498.script.js',
  '499.script.js',
  '558.script.js',
  '559.script.js',
  '560.script.js',
  '561.script.js',
  '562.script.js',
  '570.script.js',
  '581.script.js',
  '657.script.js',
  '681.script.js',
  '682.script.js',
];

const earlyExcluded = [ // eslint-disable-line no-unused-vars
  '5.script.js',
  '6.script.js',
  '7.script.js',
  '8.script.js',
  '9.script.js',

  '43.script.js',
  '43.script.js',
  '44.script.js',
  '45.script.js',
  '46.script.js',
  '47.script.js',
  '48.script.js',
  '49.script.js',
  '50.script.js',
  '51.script.js',
  '52.script.js',
  '53.script.js',
  '54.script.js',
  '55.script.js',
  '56.script.js',
  '57.script.js',
  '58.script.js',
  '59.script.js',
  '60.script.js',
  '61.script.js',
  '62.script.js',
  '63.script.js',
  '64.script.js',
  '65.script.js',
  '66.script.js',
  '67.script.js',
  '68.script.js',
  '69.script.js',
  '70.script.js',
  '72.script.js',
  '73.script.js',
  '74.script.js',
  '75.script.js',
  '76.script.js',
  '77.script.js',
  '78.script.js',
  '79.script.js',
  '80.script.js',
  '81.script.js',
  '82.script.js',
  '83.script.js',
  '84.script.js',
  '85.script.js',
  '86.script.js',
  '87.script.js',
  '89.script.js',
  '91.script.js',
  '92.script.js',
  '94.script.js',
  '95.script.js',
  '96.script.js',
  '97.script.js',
  '99.script.js',

  '420.script.js',
  '421.script.js',
  '425.script.js',
  '426.script.js',
  '427.script.js',
  '428.script.js',
  '429.script.js',
  '430.script.js',
  '431.script.js',
  '432.script.js',
  '433.script.js',
  '434.script.js',
  '435.script.js',
  '436.script.js',
  '437.script.js',
  '441.script.js',
  '442.script.js',
  '443.script.js',
  '444.script.js',
  '445.script.js',
  '446.script.js',
  '447.script.js',
  '448.script.js',
  '449.script.js',
  '450.script.js',
  '451.script.js',
  '452.script.js',
  '453.script.js',
  '454.script.js',
  '455.script.js',
  '456.script.js',
  '457.script.js',
  '458.script.js',
  '459.script.js',
  '460.script.js',
  '461.script.js',
  '462.script.js',
  '463.script.js',
  '464.script.js',
  '465.script.js',
  '466.script.js',
  '467.script.js',
  '468.script.js',
  '469.script.js',
  '470.script.js',
  '471.script.js',
  '472.script.js',
  '473.script.js',
  '474.script.js',
  '475.script.js',
  '476.script.js',
  '477.script.js',
  '478.script.js',
  '479.script.js',
  '480.script.js',
  '481.script.js',
  '482.script.js',
  '483.script.js',
  '484.script.js',
  '485.script.js',
  '490.script.js',
  '492.script.js',
  '493.script.js',
  '495.script.js',
  '496.script.js',
  '497.script.js',
  '498.script.js',
  '499.script.js',
  '500.script.js',
  '501.script.js',
  '502.script.js',
  '503.script.js',
  '505.script.js',
  '509.script.js',
  '510.script.js',
  '513.script.js',
  '515.script.js',
  '516.script.js',
  '519.script.js',
  '520.script.js',
  '521.script.js',
  '522.script.js',
  '523.script.js',
  '524.script.js',
  '525.script.js',
  '526.script.js',
  '527.script.js',
  '528.script.js',
  '529.script.js',
  '530.script.js',
  '531.script.js',
  '532.script.js',
  '533.script.js',
  '534.script.js',
  '535.script.js',
  '536.script.js',
  '537.script.js',
  '538.script.js',
  '540.script.js',
  '546.script.js',
  '547.script.js',
  '548.script.js',
  '549.script.js',
  '550.script.js',
  '551.script.js',
  '552.script.js',
  '553.script.js',
  '554.script.js',
  '555.script.js',
  '556.script.js',
  '562.script.js',
  '573.script.js',
  '584.script.js',
  '595.script.js',
  '597.script.js',
  '598.script.js',
  '603.script.js',
  '604.script.js',
  '605.script.js',
  '606.script.js',
  '607.script.js',
  '608.script.js',
  '610.script.js',
  '611.script.js',
  '612.script.js',
  '614.script.js',
  '615.script.js',
  '616.script.js',
  '617.script.js',
  '618.script.js',
  '619.script.js',
  '620.script.js',
  '621.script.js',
  '622.script.js',
  '623.script.js',
  '624.script.js',
  '625.script.js',
  '626.script.js',
  '627.script.js',
  '628.script.js',
  '629.script.js',
  '630.script.js',
  '631.script.js',
  '633.script.js',
  '634.script.js',
  '635.script.js',
  '636.script.js',
  '637.script.js',
  '638.script.js',
  '639.script.js',
  '640.script.js',
  '641.script.js',
  '642.script.js',
  '643.script.js',
  '644.script.js',
  '645.script.js',
  '646.script.js',
  '647.script.js',

  '437.module.js',
  '503.module.js',
  '505.module.js',
  '509.module.js',
  '510.module.js',
  '513.module.js',
  '515.module.js',
  '516.module.js',
  '519.module.js',
  '520.module.js',
  '521.module.js',
  '522.module.js',
  '523.module.js',
  '524.module.js',
  '525.module.js',
  '526.module.js',
  '527.module.js',
  '528.module.js',
  '529.module.js',
  '530.module.js',
  '531.module.js',
  '532.module.js',
  '533.module.js',
  '534.module.js',
  '535.module.js',
  '536.module.js',
  '537.module.js',
  '538.module.js',
];

const PARSER_TEST_DIR = 'test262-parser-tests';
const EXTRA_TEST_DIR = 'extra-parser-tests';

let pass = fs.readdirSync(`./test/parser/${PARSER_TEST_DIR}/pass`);
let fail = fs.readdirSync(`./test/parser/${PARSER_TEST_DIR}/fail`);
// let early = fs.readdirSync(`./test/parser/${PARSER_TEST_DIR}/early`);
let passExtra = fs.readdirSync(`./test/parser/${EXTRA_TEST_DIR}/pass`);

function mkTester(subdir, testDir) {
  function f(t, fname) {
    let result = compile(
      `./${testDir}/${subdir}/${fname}`,
      new NodeLoader(__dirname),
    );
    t.not(result, null);
  }
  f.title = (title, fname, expected) => {
    let src = fs.readFileSync(
      `./test/parser/${testDir}/${subdir}/${fname}`,
      'utf8',
    );
    return `${fname}:
${src}
`;
  };
  return f;
}

function mkFailTester(subdir, testDir) {
  function f(t, fname) {
    t.throws(() =>
      compile(`./${testDir}/${subdir}/${fname}`, new NodeLoader(__dirname)));
  }
  f.title = (title, fname, expected) => {
    let src = fs.readFileSync(
      `./test/parser/${testDir}/${subdir}/${fname}`,
      'utf8',
    );
    return `${fname}:
${src}
`;
  };
  return f;
}

let passTest = mkTester('pass', PARSER_TEST_DIR);
let failTest = mkFailTester('fail', PARSER_TEST_DIR);
// let earlyTest = mkFailTester('early', PARSER_TEST_DIR);
let extras = mkTester('pass', EXTRA_TEST_DIR);

pass.filter(f => !passExcluded.includes(f)).forEach(f => test(passTest, f));

fail.filter(f => !failExcluded.includes(f)).forEach(f => test(failTest, f));

// early.filter(f => !earlyExcluded.includes(f)).forEach(f => test(earlyTest, f));

passExtra.forEach(f => test(extras, f));
