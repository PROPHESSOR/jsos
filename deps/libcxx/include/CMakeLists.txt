if (NOT LIBCXX_INSTALL_SUPPORT_HEADERS)
  set(LIBCXX_SUPPORT_HEADER_PATTERN PATTERN "support" EXCLUDE)
endif()

install(DIRECTORY .
  DESTINATION include/c++/v1
  FILES_MATCHING
  PATTERN "*"
  PATTERN "CMakeLists.txt" EXCLUDE
  PATTERN ".svn" EXCLUDE
  ${LIBCXX_SUPPORT_HEADER_PATTERN}
  PERMISSIONS OWNER_READ OWNER_WRITE GROUP_READ WORLD_READ
  )
