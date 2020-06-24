# BUG

## GIT

### GIT ERR/报错 Pull is not possible because you have unmerged files

把本地项目推送到远程git仓库时出现此错误

``` bash
> git rev-parse --show-toplevel
> git rev-parse --git-dir
Open repository: g:\PrivateFile\CV\Press
> git status -z -u
> git check-ignore -v -z --stdin
> git symbolic-ref --short HEAD
> git rev-parse master
> git rev-parse --symbolic-full-name master@{u}
> git rev-list --left-right master...refs/remotes/origin/master
> git for-each-ref --format %(refname) %(objectname) --sort -committerdate
> git remote --verbose
> git check-ignore -v -z --stdin
> git pull --tags origin master
error: Pulling is not possible because you have unmerged files.
hint: Fix them up in the work tree, and then use 'git add/rm <file>'
hint: as appropriate to mark resolution and make a commit.
fatal: Exiting because of an unresolved conflict.
```

解决方法如下：
::: danger
解决本地文件与远程文件冲突，使用以下命令，但是会删除以前的代码，不推荐使用，意外删除可参考链接1
:::

``` bash
git reset --hard FETCH_HEAD
git pull

git reflog
git reset --hard
```

[1.参考链接]:https://blog.csdn.net/magiclyj/article/details/81475601
