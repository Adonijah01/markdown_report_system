// Report 页面 JavaScript

// 生成目录
function generateTableOfContents() {
    const headings = document.querySelectorAll('.report-content h1, .report-content h2, .report-content h3, .report-content h4, .report-content h5, .report-content h6');
    
    // 如果标题数量少于3个，不生成目录
    if (headings.length < 3) {
        const tocContainer = document.getElementById('table-of-contents');
        if (tocContainer) {
            tocContainer.style.display = 'none';
        }
        return;
    }
    
    const tocContainer = document.getElementById('table-of-contents');
    if (!tocContainer) return;
    
    // 检查报告内容中是否已经包含目录
    // 如果已经有目录相关的内容，就不生成新的目录
    const reportContent = document.querySelector('.report-content');
    if (reportContent) {
        const existingToc = reportContent.querySelector('ul, ol');
        const tocKeywords = ['目录', '目次', 'table of contents', 'toc', 'contents'];
        
        if (existingToc) {
            const tocText = existingToc.textContent.toLowerCase();
            const parentText = existingToc.parentElement ? existingToc.parentElement.textContent.toLowerCase() : '';
            
            // 如果找到了可能的目录，检查是否包含目录关键词
            const hasKeywords = tocKeywords.some(keyword => 
                tocText.includes(keyword) || parentText.includes(keyword)
            );
            
            if (hasKeywords) {
                console.log('检测到现有目录，跳过自动生成');
                tocContainer.style.display = 'none';
                return;
            }
        }
    }
    
    // 创建目录标题
    const tocTitle = document.createElement('h3');
    tocTitle.textContent = '📋 目录';
    tocContainer.appendChild(tocTitle);
    
    // 创建目录列表
    const tocList = document.createElement('ul');
    tocList.className = 'toc-list';
    
    headings.forEach((heading, index) => {
        // 为标题添加 ID
        if (!heading.id) {
            heading.id = 'heading-' + index;
        }
        
        // 创建目录项
        const tocItem = document.createElement('li');
        const tocLink = document.createElement('a');
        
        tocLink.href = '#' + heading.id;
        tocLink.textContent = heading.textContent;
        tocLink.className = 'toc-' + heading.tagName.toLowerCase();
        
        // 添加点击事件
        tocLink.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToHeading(heading.id);
        });
        
        tocItem.appendChild(tocLink);
        tocList.appendChild(tocItem);
    });
    
    tocContainer.appendChild(tocList);
}

// 滚动到指定标题
function scrollToHeading(headingId) {
    const heading = document.getElementById(headingId);
    if (heading) {
        heading.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // 更新 URL 哈希
        window.history.pushState(null, null, '#' + headingId);
        
        // 添加高亮效果
        heading.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
        heading.style.transition = 'background-color 0.3s ease';
        
        setTimeout(() => {
            heading.style.backgroundColor = '';
        }, 2000);
    }
}

// 为标题添加锚点链接功能
function initHeadingAnchors() {
    const headings = document.querySelectorAll('.report-content h1, .report-content h2, .report-content h3, .report-content h4, .report-content h5, .report-content h6');
    
    headings.forEach((heading, index) => {
        if (!heading.id) {
            heading.id = 'heading-' + index;
        }
        
        // 添加点击事件
        heading.addEventListener('click', function() {
            const url = window.location.href.split('#')[0] + '#' + heading.id;
            
            // 复制链接到剪贴板
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(url).then(() => {
                    showToast('链接已复制到剪贴板');
                }).catch(() => {
                    console.log('无法复制链接');
                });
            } else {
                // 降级处理
                const textArea = document.createElement('textarea');
                textArea.value = url;
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    showToast('链接已复制到剪贴板');
                } catch (err) {
                    console.log('无法复制链接');
                }
                if (textArea.parentNode) {
                    textArea.parentNode.removeChild(textArea);
                }
            }
            
            // 更新 URL
            window.history.pushState(null, null, '#' + heading.id);
        });
        
        // 添加鼠标悬停样式
        heading.style.cursor = 'pointer';
        heading.title = '点击复制链接';
    });
}

// 显示提示消息
function showToast(message) {
    // 创建提示元素
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 12px 20px;
        border-radius: 6px;
        font-size: 14px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // 显示动画
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // 自动隐藏
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}



// 代码块复制功能和样式增强
function initCodeCopy() {
    const codeBlocks = document.querySelectorAll('.report-content pre');
    
    codeBlocks.forEach(block => {
        // 智能检测代码块类型
        const codeElement = block.querySelector('code');
        if (codeElement) {
            const content = codeElement.textContent.toLowerCase();
            
            // 检测不同类型的命令行
            if (content.includes('sudo') || content.includes('root@') || content.includes('#')) {
                block.classList.add('terminal-root');
            } else if (content.includes('c:\\') || content.includes('cmd') || content.includes('powershell')) {
                block.classList.add('terminal-windows');
            } else if (content.includes('>>>') || content.includes('python') || content.includes('pip')) {
                block.classList.add('terminal-python');
            }
        }
        
        // 创建 Kali Linux 标题栏
        const titleBar = document.createElement('div');
        titleBar.style.cssText = `
            position: absolute;
            top: 12px;
            right: 60px;
            color: #00ff41;
            font-size: 10px;
            font-family: 'Ubuntu Mono', 'Consolas', 'Monaco', 'Courier New', monospace;
            text-transform: uppercase;
            letter-spacing: 1px;
            opacity: 0.8;
            transition: opacity 0.3s ease;
            text-shadow: 0 0 5px rgba(0, 255, 65, 0.5);
        `;
        
        if (block.classList.contains('terminal-root')) {
            titleBar.textContent = 'ROOT@KALI';
        } else if (block.classList.contains('terminal-windows')) {
            titleBar.textContent = 'CMD.EXE';
        } else if (block.classList.contains('terminal-python')) {
            titleBar.textContent = 'PYTHON3';
        } else {
            titleBar.textContent = 'KALI@LINUX';
        }
        
        block.appendChild(titleBar);
        
        // 创建 Kali Linux 风格复制按钮
        const copyButton = document.createElement('button');
        copyButton.innerHTML = '⚡';
        copyButton.title = '复制命令';
        copyButton.style.cssText = `
            position: absolute;
            top: 5px;
            right: 16px;
            background: transparent;
            color: #00ff41;
            border: 1px solid #00ff41;
            padding: 4px 8px;
            border-radius: 6px;
            font-size: 12px;
            cursor: pointer;
            opacity: 0;
            transition: all 0.3s ease;
            font-family: inherit;
            text-shadow: 0 0 5px rgba(0, 255, 65, 0.5);
            box-shadow: 0 0 5px rgba(0, 255, 65, 0.2);
        `;
        
        // 设置代码块为相对定位
        block.style.position = 'relative';
        
        // 添加复制按钮
        block.appendChild(copyButton);
        
        // Kali Linux 风格悬停效果
        block.addEventListener('mouseenter', () => {
            copyButton.style.opacity = '1';
            copyButton.style.background = 'rgba(0, 255, 65, 0.1)';
            copyButton.style.borderColor = '#39ff14';
            titleBar.style.opacity = '1';
        });
        
        block.addEventListener('mouseleave', () => {
            copyButton.style.opacity = '0';
            copyButton.style.background = 'transparent';
            copyButton.style.borderColor = '#00ff41';
            titleBar.style.opacity = '0.8';
        });
        
        // Kali Linux 复制按钮悬停效果
        copyButton.addEventListener('mouseenter', () => {
            copyButton.style.background = 'rgba(57, 255, 20, 0.2)';
            copyButton.style.color = '#39ff14';
            copyButton.style.transform = 'scale(1.1)';
            copyButton.style.boxShadow = '0 0 15px rgba(57, 255, 20, 0.5)';
        });
        
        copyButton.addEventListener('mouseleave', () => {
            copyButton.style.background = 'rgba(0, 255, 65, 0.1)';
            copyButton.style.color = '#00ff41';
            copyButton.style.transform = 'scale(1)';
            copyButton.style.boxShadow = '0 0 5px rgba(0, 255, 65, 0.2)';
        });
        
        // 复制功能
        copyButton.addEventListener('click', () => {
            const code = block.querySelector('code') || block;
            let text = code.textContent;
            
            // 移除提示符，只复制实际命令
            if (block.classList.contains('terminal-root')) {
                text = text.replace(/^# /gm, '');
            } else if (block.classList.contains('terminal-windows')) {
                text = text.replace(/^C:\\> /gm, '');
            } else if (block.classList.contains('terminal-python')) {
                text = text.replace(/^>>> /gm, '');
            } else {
                text = text.replace(/^\$ /gm, '');
            }
            
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(() => {
                    copyButton.innerHTML = '💀';
                    copyButton.style.color = '#39ff14';
                    copyButton.style.textShadow = '0 0 10px rgba(57, 255, 20, 0.8)';
                    copyButton.style.boxShadow = '0 0 20px rgba(57, 255, 20, 0.6)';
                    setTimeout(() => {
                        copyButton.innerHTML = '⚡';
                        copyButton.style.color = '#00ff41';
                        copyButton.style.textShadow = '0 0 5px rgba(0, 255, 65, 0.5)';
                        copyButton.style.boxShadow = '0 0 5px rgba(0, 255, 65, 0.2)';
                    }, 2000);
                });
            } else {
                // 降级处理
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    copyButton.innerHTML = '💀';
                    copyButton.style.color = '#39ff14';
                    copyButton.style.textShadow = '0 0 10px rgba(57, 255, 20, 0.8)';
                    copyButton.style.boxShadow = '0 0 20px rgba(57, 255, 20, 0.6)';
                    setTimeout(() => {
                        copyButton.innerHTML = '⚡';
                        copyButton.style.color = '#00ff41';
                        copyButton.style.textShadow = '0 0 5px rgba(0, 255, 65, 0.5)';
                        copyButton.style.boxShadow = '0 0 5px rgba(0, 255, 65, 0.2)';
                    }, 2000);
                } catch (err) {
                    console.log('无法复制代码');
                }
                if (textArea.parentNode) {
                    textArea.parentNode.removeChild(textArea);
                }
            }
        });
    });
}

// 图片懒加载
function initImageLazyLoad() {
    const images = document.querySelectorAll('.report-content img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        images.forEach(img => {
            if (img.dataset.src) {
                imageObserver.observe(img);
            }
        });
    }
}

// 键盘快捷键
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // P 键打印
        if (e.key === 'p' && e.ctrlKey) {
            e.preventDefault();
            window.print();
        }
        
        // Home 键回到顶部
        if (e.key === 'Home') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // End 键到底部
        if (e.key === 'End') {
            e.preventDefault();
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    });
}

// 阅读进度条
function initReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--primary-color);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollTop = window.pageYOffset;
        const progress = (scrollTop / scrollHeight) * 100;
        
        progressBar.style.width = progress + '%';
    });
}

// 全屏切换
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

// 页面初始化
document.addEventListener('DOMContentLoaded', function() {
    // 生成目录
    generateTableOfContents();
    
    // 初始化标题锚点
    initHeadingAnchors();
    

    
    // 初始化代码复制
    initCodeCopy();
    
    // 初始化图片懒加载
    initImageLazyLoad();
    
    // 初始化键盘快捷键
    initKeyboardShortcuts();
    
    // 初始化阅读进度条
    initReadingProgress();
    
    // 处理 URL 哈希
    if (window.location.hash) {
        const headingId = window.location.hash.substring(1);
        setTimeout(() => {
            scrollToHeading(headingId);
        }, 100);
    }
    
    console.log('Report 页面初始化完成');
});

// 导出函数供其他脚本使用
window.ReportPage = {
    generateTableOfContents,
    scrollToHeading,
    initHeadingAnchors,
    showToast,
    toggleFullscreen
}; 