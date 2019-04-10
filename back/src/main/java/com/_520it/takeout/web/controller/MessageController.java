package com._520it.takeout.web.controller;

import com._520it.takeout.page.PageResult;
import com._520it.takeout.query.MessageQuery;
import com._520it.takeout.service.IMessageService;
import com._520it.takeout.util.AjaxResult;
import com._520it.takeout.util.ArticleUtil;
import com._520it.takeout.util.WeixinUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.List;

@Controller
public class MessageController {

    @Autowired
    private IMessageService messageService;

    @RequestMapping("/message_views")
    public String list() {
        return "message";
    }

    @RequestMapping("/message_list")
    @ResponseBody
    public PageResult seleAll(MessageQuery qo) {
        return messageService.selectAll(qo);
    }

    //    批量删除消息
    @RequestMapping("/message_delete")
    @ResponseBody
    public AjaxResult delete(@RequestParam("ids[]") Long[] ids) {
        try {
            for (Long id : ids) {
                messageService.deleteByPrimaryKey(id);
            }
            return new AjaxResult(true, "删除成功");
        } catch (Exception e) {
            e.printStackTrace();
            return new AjaxResult(false, "删除失败");
        }
    }


    //=======================整合bootstrap===========================================
    @RequestMapping("/message_views_bootstrap")
    public String message_views_bootstrap(Model model, MessageQuery qo) {
        PageResult pageResult = messageService.selectAll(qo);
        pageResult.setCurrentPage(qo.getPage());
//        com._520it.takeout.bootstrap.PageResult pageResult1 = new com._520it.takeout.bootstrap.PageResult(pageResult.getRows(), pageResult.getTotal().intValue(), qo.getPage(), 10);
        model.addAttribute("pageResult", pageResult);
        return "message";
    }

}
