require "time"
module Jekyll
  class GitInfoGenerator < Generator
    priority :lowest
    def generate(site)
      return unless git_present?
      site.posts.docs.each do |post|
        path = post.path
        author = git_command("git log -1 --format=%an -- " + path)
        date = git_command("git log -1 --format=%ad --date=iso -- " + path)
        post.data['git_author'] = author unless author.empty?
        post.data['git_date'] = Time.parse(date) rescue nil unless date.empty?
      end
    end

    private

    def git_present?
      system('git rev-parse --is-inside-work-tree > /dev/null 2>&1')
    end

    def git_command(cmd)
      `#{cmd}`.strip
    end
  end
end
