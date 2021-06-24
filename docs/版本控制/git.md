### 番外篇：
需求：把`develop分`支的最新代码合到目前本地开发的`feature/aftersale`分支

- 在`feature/aftersale`分支，`pull `最新的`feature/aftersale`代码
- 然后 `git pull origin develop `把`develop`分支的最新代码拉到本地，`git rebase -i develop`   合到本地
- 有冲突解决冲突,然后`git rebase --continue` `git push origin feature/x -f` 把代码强推上去提pr，把`feature/aftersale`分支合并到`develop`分支

#### git基本操作：
- `git log`查看日志
- `git status` 查看状态
- `git branch `查看分支
- `git clone `克隆项目
- `git clear ` 清除命令窗口输入
- `git stash  `把不想提交的代码，放到暂存
- `git stash pop`  拉取代码后，再放出来

#### 推送代码：

- `git add ./ ` 把修改加入到暂存
- `git  commit  -m ‘xxxx’`
- `git pull orgin feature/price` 代码推送之前需要远端更新的代码
- `git push origin feature/price`   把代码推到远端

#### 分支问题：
- `git checkout -b test/price`   新建`test/price`分支，并且切换过去
- `git checkout feature/price `    切换到`feature/price`分支
- `git push origin feature/price` 把更新推到远端的`feature/price`分支
- `git push origin feature/price:test/price`     把更新从`feature/price`分支同步到`test/price`分支

#### git rebase 与解决冲突：
master  分支
feature 分支
1、在master分支pull最新的代码
2、切换过去feature
3、把feature合并到master
`git rebase master`

#### 区别：
- `git rebase feature/xxxx` // 从master分支合并到feature/xxxx
- `git rebase -i feature/xxx`  //如果feature/xxx分支比master分支前，就合并不了，需要切换到feature/xxx分支，`git rebase -i master `  // 编辑、重排commit的顺序和选择一些需要的commit，放弃不需要的commit
##### 如果发生冲突：
- 1、如果解决完冲突后，就直接执行`git rebase --continue`，不用git commit 操作 ， 然后再push到远端
- 2、如果希望跳过解决冲突，就执行`git rebase --skip`
- 3、如果希望签出原始分支并停止rebase,  就执行`git rebase --abort `
执行完`git rebase --continue`操作后，再`git push origin feature/dev  `
`feature/xxx ` 开发分支
`test/xxx`  测试联调分支
`release/xxx ` 测试灰度分支

#### 撤销与回滚
- `git commit` 之前
- `git reset HEAD ~[num]`  // 一次性将所有暂存区文件撤销回来,但没有修改远端的commit
- `git revert HEAD`   // 可以修改已经提交到远端的commit
- git commit 之后
- 使用git log 查看提交记录
- `git revert + commitId`

#### 配置：
- `git config --list`  查看配置
- `sudo git config --system pull.rebase true` 配置`pull.rebase true`
- 分支合代码都用`git rebase`，不用merge。要配置下git pull
- `git config --global user.email xxxxx@guanmai.cn.`  配置邮箱
- `git config --global user.name "xxxx`  配置用户名

#### git使用注意⚠️：
- 使用zsh，可以看到具体分支
- 发布灰度测试之前要先切换到master分支拉取最新修改 
- `git pull origin master `
- 切换到`feature/price`分支合并master的最新代码
- `git rebase -i master ` 
- 然后把拉取到的更新推到远端的分支`
- `git push origin feature/price ` 可能会报错，需要用到强制推
- `git push origin feature/price -f ` ⚠️慎重使用-f， 特别多人开发的时候
- `git push origin feature/price:release/price -f`  灰度分支也同步代码
- 若合并代码有冲突，自己检查一下功能是否出现问题再交给测试

#### 默认type-enum规则
- feat: 新功能
- fix: 修改bug
- style: 代码格式化相关，与功能无关的改动
- revert: 回滚
- docs: 修改文档
- chore: 改变构建流程，依赖库，工具等
- build：构建项目
- perf：性能优化
- refactor：重构代码
- test：测试用例相关修改
- ci：ci相关修改

WIP（自定义）：过程中的工作

`e.g. git commit -m 'feat(scope): msg'`

#### 命令缩写
- `gst - git status`
- `gl - git pull`
- `gup - git pull --rebase`
- `gp - git push`
- `gd - git diff`
- `gcmsg - git commit -m`
- `gco - git checkout`
- `gcm - git checkout master`
- `gr - git remote`
- `grv - git remote -v`
- `grbi - git rebase -i`
- `grbc - git rebase --continue`
- `grba - git rebase --abort`
- `gb - git branch`
- `gba - git branch -a`
- `gcp - git cherry-pick`
- `ga - git add`
- `gm - git merge`
- `grh - git reset HEAD`
- `grhh - git reset HEAD --hard`
- `gsta - git stash`
- `ggpull - git pull origin $(current_branch)`
- `ggpush - git push origin $(current_branch)`

#### 相关文章
[https://juejin.cn/post/6974184935804534815?utm_source=gold_browser_extension](https://juejin.cn/post/6974184935804534815?utm_source=gold_browser_extension)