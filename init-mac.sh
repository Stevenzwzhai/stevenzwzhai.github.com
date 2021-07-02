echo "
┏┛ ┻━━━━━┛ ┻┓
  ┃　　　　　　 ┃
  ┃　　　━　　　┃
  ┃　┳┛　  ┗┳　┃
  ┃　　　　　　 ┃
  ┃　　　┻　　　┃
  ┃　　　　　　 ┃
  ┗━┓　　　┏━━━┛
    ┃　　　┃   神兽保佑
    ┃　　　┃   代码无BUG！
    ┃　　　┗━━━━━━━━━┓
    ┃　　　　　　　    ┣┓
    ┃　　　　         ┏┛
    ┗━┓ ┓ ┏━━━┳ ┓ ┏━┛
    ┃ ┫ ┫   ┃ ┫ ┫
      ┗━┻━┛   ┗━┻━┛
"

# 安装nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
source ~/.bash_profile
# 安装node
nvm install v10.13.0
# 安装whistle
npm install whistle -g
w2 start

# 安装homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安装iterm
# curl https://iterm2.com/downloads/stable/iTerm2-3_4_8.zip

# oh-myzsh
export REMOTE=https://gitee.com/imirror/ohmyzsh.git
sh -c "$(curl -fsSL https://cdn.jsdelivr.net/gh/ohmyzsh/ohmyzsh/tools/install.sh)"

# 安装git、iterm2、google浏览器、qq音乐、postman、docker、vscode、nginx、QQ、wechat、netopsy
brew install git &
brew install iTerm2 &
brew install --cask google-chrome &
brew install --cask qqmusic &
brew install --cask postman &
brew install --cask docker &
brew install --cask visual-studio-code &
brew install --cask QQ &
brew install --cask wechat &
brew install --cask netopsy &
brew install nginx
brew service start nginx

# webstorm 激活 https://www.jianshu.com/p/b91942596c02
# isparta
# 替换 Homebrew 源
# $ cd "$(brew --repo)"
# $ git remote set-url origin https://mirrors.ustc.edu.cn/brew.git
# 2. 切换 Homebrew Core 源
# $ cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
# $ git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git
# 3. 切换 Homebrew Cask 源
# cd "$(brew --repo)"/Library/Taps/homebrew/homebrew-cask
# git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-cask.git


