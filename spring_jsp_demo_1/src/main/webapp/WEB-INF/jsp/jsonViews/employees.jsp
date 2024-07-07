<%@ page contentType="application/json;charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page import="com.fasterxml.jackson.databind.ObjectMapper" %>

{
    "test": [
            <c:forEach items="${employees}" var="employee" varStatus="loop">
                {
                    "name": "${employee.name}",
                    "age": ${employee.age}
                } <c:if test="${loop.index != (employees.size() - 1)}">
                    ,
                </c:if>
            </c:forEach>

    ]
}
<%
    // List<Employee> employees = (List<Employee>) request.getAttribute("employees");

    // ObjectMapper objectMapper = new ObjectMapper();
    // StringBuilder jsonBuilder = new StringBuilder();
    // jsonBuilder.append("[");

    // // Iterate over employees and build JSON array
    // for (int i = 0; i < employees.size(); i++) {
    //     Employee employee = employees.get(i);
    //     jsonBuilder.append("{");
    //     jsonBuilder.append("\"id\": ").append(employee.getId()).append(",");
    //     jsonBuilder.append("\"name\": \"").append(employee.getName()).append("\",");
    //     jsonBuilder.append("\"department\": \"").append(employee.getDepartment()).append("\"");
    //     jsonBuilder.append("}");
    //     if (i < employees.size() - 1) {
    //         jsonBuilder.append(",");
    //     }
    // }

    // jsonBuilder.append("]");

    // out.print(jsonBuilder.toString());
%>
