<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <jsp:include path="common.jsp" />
        </head>

        <body>
            <h1>Welcome jsp page</h1>
            <% String message=(String) request.getAttribute("data"); %>

                <script>
                    console.log(typeof Ext)
                    if (typeof Ext != "undefined") {
                        console.log("Triggered")
                        Ext.Ajax.request({
                            url: 'https://reqres.in/api/users',
                            method: 'GET',
                            success: (resp, opts) => {
                                var obj = Ext.decode(resp.responseText)
                                console.log("Data: ", obj.data);
                            }
                        })
                    }
                </script>
                <!-- <table border="1">
        <thead>
            <tr>
                <th>Name</th>
                <th>Age</th>
            </tr>
        </thead>
        <tbody>
            <c:forEach items="${employees}" var="employee">
                <tr>
                    <td>${employee.name}</td>
                    <td>${employee.age}</td>
                </tr>
            </c:forEach>
        </tbody>
    </table> -->

                <p>Message from controller : <%= message %>
                </p>
        </body>

        </html>