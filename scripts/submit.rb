require 'fileutils'

if ARGV.size == 2
    contest, task = ARGV
    url = "https://atcoder.jp/contests/#{contest}/tasks/#{contest}_#{task}"
    FileUtils.rm_r('./test') if Dir.exist?('./test')
    system("oj d #{url}")
end
system("npm run build && oj t -c 'node ./a.out.js' && oj s ./a.out.js -l 5009 --yes --wait=0 && rm ./a.out.js");