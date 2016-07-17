require 'rubygems'
require 'reduce'
require 'coveralls'
Coveralls.wear!

desc 'Deploy to Github Pages'
task :deploy do
  puts '## Deploying to Github Pages'

  puts '## Generating site'
  system 'jekyll build'

  cd '_site' do
    system 'git add -A'

    message = "Site updated at #{Time.now.utc}"
    puts "## Commiting: #{message}"
    system "git commit -m \"#{message}\""

    puts '## Pushing generated site'
    system 'git push'

    puts '## Deploy Complete!'
  end
end

desc 'Minify _site/'
task :minify do
  puts "\n## Compressing static assets"
  original = 0.0
  compressed = 0
  Dir.glob('_site/**/*.*') do |file|
    case File.extname(file)
    when '.css', '.gif', '.html', '.jpg', '.jpeg', '.js', '.png', '.xml'
      puts "Processing: #{file}"
      original += File.size(file).to_f
      min = Reduce.reduce(file)
      File.open(file, 'w') do |f|
        f.write(min)
      end
      compressed += File.size(file)
    else
      puts "Skipping: #{file}"
      end
  end
  puts 'Total compression %0.2f%' % (((original - compressed) / original) * 100)
end
