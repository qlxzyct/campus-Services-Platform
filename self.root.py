import tkinter as tk
import tkinter.ttk as ttk
import tkinter.messagebox as messagebox
import webbrowser

class Browser:
    def __init__(self):
        # 创建主窗口
        self.root = tk.Tk()
        self.root.title("简单浏览器")

        # 创建地址栏和按钮
        self.address_var = tk.StringVar()
        self.address_var.set("https://www.google.com")
        self.address_entry = ttk.Entry(self.root, textvariable=self.address_var, width=60)
        self.address_entry.pack(side=tk.LEFT, padx=5, pady=5)
        self.go_button = ttk.Button(self.root, text="前往", command=self.go_to_url)
        self.go_button.pack(side=tk.LEFT, padx=5, pady=5)

        # 创建导航按钮
        self.back_button = ttk.Button(self.root, text="<<", command=self.back)
        self.back_button.pack(side=tk.LEFT, padx=5, pady=5)
        self.forward_button = ttk.Button(self.root, text=">>", command=self.forward)
        self.forward_button.pack(side=tk.LEFT, padx=5, pady=5)

        # 创建刷新按钮
        self.refresh_button = ttk.Button(self.root, text="刷新", command=self.refresh)
        self.refresh_button.pack(side=tk.LEFT, padx=5, pady=5)

        # 创建浏览器窗口
        self.browser = tk.Text(self.root, wrap=tk.WORD)
        self.browser.pack(side=tk.TOP, fill=tk.BOTH, expand=True)

        # 设置浏览器窗口的初始内容
        self.browser.insert(tk.END, "欢迎使用简单浏览器！")

        # 开始主循环
        self.root.mainloop()

    def go_to_url(self):
        """导航到指定URL"""
        url = self.address_var.get()
        if not url.startswith("http"):
            url = "http://" + url
        try:
            self.browser.delete("1.0", tk.END)
            self.browser.insert(tk.END, "正在加载...")
            self.browser.update()
            webbrowser.open(url)
            self.browser.delete("1.0", tk.END)
            self.browser.insert(tk.END, f"当前页面：{url}")
            self.address_var.set(url)
        except Exception as e:
            messagebox.showerror("错误", f"无法加载页面：{e}")

    def back(self):
        """返回上一页"""
        if webbrowser.get().can_go_back():
            webbrowser.get().back()

    def forward(self):
        """前进到下一页"""
        if webbrowser.get().can_go_forward():
            webbrowser.get().forward()

    def refresh(self):
        """刷新当前页面"""
        webbrowser.get().reload()

if __name__ == "__main__":
    Browser()
