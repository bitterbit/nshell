
/**
 * Module dependencies.
 */

var Process = require('./process');
var fs = require('fs');
var cash = require('cash');

function registerCashCommand() {
  return function(cmd, shell){
    var argv = " "+cmd.argv || "";
    var proc = new Process;
    process.nextTick(function(){
      var out = cash(cmd.name + argv);
      proc.write(out);
      proc.exit(0);;
    });
    return proc;
  };
}

/**
 * . <filename>
 */

exports['.'] = function(cmd, shell){
  var proc = new Process;

  // args required
  if (!cmd.argv.length) {
    process.nextTick(function(){
      proc.error('<filename> required\n');
      proc.exit(1);
    });

    return proc;
  }

  // source
  shell.source(cmd.argv[0]);
  process.nextTick(function(){
    proc.exit(0);
  });

  return proc;
};

/**
 * cd <path>
 */

exports.cd = function(cmd, shell){
  var proc = new Process;
  var dest = shell.env("HOME");

  if (cmd.argv.length) {
    dest = cmd.argv[0];
  }

  if (!fs.existsSync(dest)) {
    process.nextTick(function(){
      proc.error("cd: " + dest +": No such file or directory\n");
      proc.exit(1);
    });

    return proc;
  }

  
  shell.cd(dest); // chdir  

  process.nextTick(function(){
    proc.exit(0);
  });

  return proc;
};

/**
 * history
 */

exports.history = function(cmd, shell){
  var proc = new Process;

  process.nextTick(function(){
    shell.rl.history.forEach(function(cmd, i){
      proc.write('  ' + i + '  ' + cmd + '\n');
    });
    proc.exit(0);
  });

  return proc;
};

/**
 * which <name>
 */

exports.which = function(cmd, shell){
  var proc = new Process;

  // args required
  if (!cmd.argv.length) {
    process.nextTick(function(){
      proc.error('<name> required\n');
      proc.exit(1);
    });

    return proc;
  }

  // lookup
  process.nextTick(function(){  
    if (shell.isBuiltin(cmd.argv[0])){
      proc.write(cmd.argv[0] + " is builtin!" + '\n');
      proc.exit(0);
      return;
    }

    var path = shell.which(cmd.argv[0]);
    if (!path) return proc.exit(1);
    proc.write(path + '\n');
    proc.exit(0);
  });

  return proc;
};

exports.ls      = registerCashCommand();
exports.cat     = registerCashCommand();
// exports.clear   = registerCashCommand();
exports.cp      = registerCashCommand();
exports.echo    = registerCashCommand();
exports.export  = registerCashCommand();
exports.false   = registerCashCommand();
exports.grep    = registerCashCommand();
// exports.head    = registerCashCommand();
exports.kill    = registerCashCommand();
// exports.less    = registerCashCommand();
exports.mkdir = registerCashCommand();
exports.mv = registerCashCommand();
exports.pwd = registerCashCommand();
exports.rm = registerCashCommand();
exports.sort = registerCashCommand();
exports.touch = registerCashCommand();
exports.true = registerCashCommand();

/**
 * exit <status>
 */

exports.exit = function(cmd, shell){
  process.exit(parseInt(cmd.argv[0], 10) || 0);
};